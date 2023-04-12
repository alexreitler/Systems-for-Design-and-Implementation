import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  joined: {
    type: Date,
    default: Date.now,
    required: true,
  },
  spentShopping: {
    type: Number,
    default: 0,
    required: true,
  },
});

export default mongoose.model("User", UserSchema);
