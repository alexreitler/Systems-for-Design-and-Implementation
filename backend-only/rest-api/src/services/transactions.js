import { v4 as uuidv4 } from "uuid";

import * as database from "../database/transactions.js";
import * as productDatabase from "../database/products.js";

//TODO add error handling
export const getTransactions = async () => {
  console.log("GET request received in service");
  return await database.getTransactions();
};

export const createTransaction = async (transaction) => {
  console.log("POST request received in service");
  const transactionWithId = { ...transaction, _id: uuidv4() };
  try {
    await database.createTransaction(transactionWithId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTransactionById = async (id) => {
  console.log(`GET request received for id ${id}`);
  return await database.getTransactionById(id);
};

export const deleteTransaction = async (id) => {
  console.log(`DELETE request received for id ${id}`);
  await database.deleteTransaction(id);
};

export const updateTransaction = async (id, transactionNewData) => {
  console.log(`PATCH request received for id ${id}`);
  const { date, amount, userIds, productIds } = transactionNewData;
  const transaction = getTransactionById(id);
  if (userIds) transaction.userIds = userIds;
  if (productIds) transaction.productIds = productIds;
  if (amount) transaction.amount = amount;
  if (date) transaction.date = date;
  await database.updateTransaction(id, transaction);
};

export const getTransactionsByAvgProductPrice = async () => {
  console.log("GET request received in service");
  const transactions = await database.getTransactions();
  const transactionsWithAvgProductPrice = [];
  for( let transaction of transactions) {
    let sum = 0;
    for(let productId of transaction.productIds){
      const product = await productDatabase.getProductById(productId);
      if(product){
        sum += product.price;
      }
      else{
        console.log(`Product with id ${productId} has no price`);
      }
    };
    const avgProductPrice = sum / transaction.productIds.length;
    transactionsWithAvgProductPrice.push({
      _id: transaction._id,
      userId: transaction.userId,
      productIds: transaction.productIds,
      amount: transaction.amount,
      date: transaction.date,
      avgProductPrice: avgProductPrice,
    });
  };
  return transactionsWithAvgProductPrice.sort((a,b) => a.avgProductPrice < b.avgProductPrice ? 1 : -1);
};
