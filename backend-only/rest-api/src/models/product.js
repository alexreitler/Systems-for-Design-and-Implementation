import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  availableNumber: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Product", ProductSchema);
