import Transaction from "../models/transaction.js";

export const getTransactions = async () => {
  console.log("GET request received in database");
  const transactions = await Transaction.find().catch((error) => {
    console.log(error);
    throw { status: 500, message: error?.message || error };
  });
  //console.log(transactions);
  return transactions;
};

export const getTransactionById = async (id) => {
  const transactions = await Transaction.findById(id).catch((error) => {
    console.log(error);
    throw { status: 500, message: error?.message || error };
  });
  //console.log(transactions);
  return transactions;
};

export const createTransaction = async (transaction) => {
  let newTransaction = new Transaction(transaction);
  newTransaction = newTransaction
    .save()
    .then(() => {
      console.log(
        `Transaction ${transaction._id} created successfully with id ${transaction._id}`
      );
    })
    .catch((error) => {
      console.log(error);
      throw { status: 500, message: error?.message || error };
    });
};

export const updateTransaction = async (id, transaction) => {
  await Transaction.updateOne({ _id: id }, transaction).catch((error) => {
    console.log(error);
    throw { status: 500, message: error?.message || error };
  });
};

export const deleteTransaction = async (id) => {
  await Transaction.deleteOne({ _id: id }).catch((error) => {
    console.log(error);
    throw { status: 500, message: error?.message || error };
  });
};

export const getTransactionsByUserId = async (userId) => {
  const transactions = await Transaction.find({ userId: userId }).catch(
    (error) => {
      console.log(error);
      throw { status: 500, message: error?.message || error };
    }
  );
  //console.log(transactions);
  return transactions;
};
