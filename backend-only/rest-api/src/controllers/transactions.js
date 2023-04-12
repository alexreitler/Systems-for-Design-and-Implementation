import * as service from "../services/transactions.js";

//TODO add error handling
export const getTransactions = async (req, res) => {
  const transactions = await service.getTransactions();
  res.send(transactions);
};

export const createTransaction = async (req, res) => {
  const body = req.body;
  if (!body.amount || !body.userId || !body.productIds) {
    res.status(400).send({ error: "Missing required fields" });
    return;
  }
  try {
    await service.createTransaction(req.body);
    res.status(201).send("Transaction added to the database!");
  } catch (error) {
    console.log(error);
    res.status(error?.status || 500).send({ error: error?.message || error });
  }
};

export const getTransactionById = async (req, res) => {
  const { id } = req.params;
  const foundTransaction = await service.getTransactionById(id);
  res.send(foundTransaction);
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  await service.deleteTransaction(id);
  res.send(`Transaction with the id ${id} deleted from the database.`);
};

export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const transaction = req.body;
  await service.updateTransaction(id, transaction);
  res.send(`Transaction with the id ${id} has been updated.`);
};

export const getTransactionsByAvgProductPrice = async (req, res) => {
  const transactions = await service.getTransactionsByAvgProductPrice();
  res.send(transactions);
};
