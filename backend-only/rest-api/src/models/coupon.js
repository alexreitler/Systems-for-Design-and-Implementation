import mongoose from "mongoose";

const CouponSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  priceReduction: {
    type: Number,
    required: true,
  },
  availableUntil: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    default: "General",
    required: true,
  },
  ownerId: String,
});

export default mongoose.model("Coupon", CouponSchema);
