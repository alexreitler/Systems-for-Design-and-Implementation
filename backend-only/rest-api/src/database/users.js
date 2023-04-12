import User from "../models/user.js";
import Coupon from "../models/coupon.js";

export const getUsers = async () => {
  console.log("GET request received in database");
  const users = await User.find().catch((error) => {
    console.log(error);
    throw { status: 500, message: error?.message || error };
  });
  //console.log(users);
  return users;
};

export const getUserById = async (id) => {
  console.log(`GET request received for id ${id} in database`);
  const users = await User.findById(id).catch((error) => {
    console.log(error);
    throw { status: 500, message: error?.message || error };
  });
  //console.log(users);
  return users;
};

export const createUser = async (user) => {
  console.log("POST request received in database");
  let newUser = new User(user);
  newUser = newUser
    .save()
    .then(() => {
      console.log(
        `User ${user.firstName} created successfully with id ${user._id}`
      );
    })
    .catch((error) => {
      console.log(error);
      throw { status: 500, message: error?.message || error };
    });
};

export const updateUser = async (id, user) => {
  console.log(`PATCH request received for id ${id} in database`);
  await User.updateOne({ _id: id }, user).catch((error) => {
    console.log(error);
    throw { status: 500, message: error?.message || error };
  });
};

export const deleteUser = async (id) => {
  console.log(`DELETE request received for id ${id} in database`);
  await User.deleteOne({ _id: id }).catch((error) => {
    console.log(error);
    throw { status: 500, message: error?.message || error };
  });
};

export const filterBySpentAmount = async (spent) => {
  console.log("GET request received in database");
  const users = await User.find({
    spentShopping: { $gte: spent },
  }).catch((error) => {
    console.log(error);
    throw { status: 500, message: error?.message || error };
  });
  //console.log(users);
  return users;
};

export const getCouponsByUserId = async (id) => {
  console.log(`GET request received for id ${id} in database`);
  const coupons = await Coupon.find({
    ownerId: id,
  }).catch((error) => {
    console.log(error);
    throw { status: 500, message: error?.message || error };
  });
  return coupons;
};
