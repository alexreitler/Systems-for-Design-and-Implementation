import express from "express";

import {
  getTransactions,
  createTransaction,
  getTransactionById,
  deleteTransaction,
  updateTransaction,
  getTransactionsByAvgProductPrice,
} from "../controllers/transactions.js";

const router = express.Router();

router.get("/", getTransactions);

router.post("/", createTransaction);

router.get("/statistic/", getTransactionsByAvgProductPrice);

router.get("/:id", getTransactionById);

router.delete("/:id", deleteTransaction);

router.patch("/:id", updateTransaction);

export default router;
