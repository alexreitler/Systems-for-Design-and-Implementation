import mongoose from "mongoose";

const TransactionSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  productIds: [String],
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model("Transaction", TransactionSchema);
