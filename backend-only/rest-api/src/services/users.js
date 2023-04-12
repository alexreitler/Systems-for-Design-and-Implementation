import { v4 as uuidv4 } from "uuid";

import * as database from "../database/users.js";
import * as transactionDatabase from "../database/transactions.js";
//TODO add error handling
export const getUsers = async () => {
  console.log("GET request received in service");
  return await database.getUsers();
};

export const createUser = async (user) => {
  console.log("POST request received in service");
  const userWithId = { ...user, _id: uuidv4() };
  try {
    await database.createUser(userWithId);
    return userWithId;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserById = async (id) => {
  console.log(`GET request received for id ${id}`);
  const user = await database.getUserById(id);
  const coupons = await database.getCouponsByUserId(id);
  return { user, coupons };
};

export const deleteUser = async (id) => {
  console.log(`DELETE request received for id ${id}`);
  await database.deleteUser(id);
};

export const updateUser = async (id, userNewData) => {
  console.log(`PATCH request received for id ${id}`);
  const { firstName, lastName, age, joined, spentShopping } = userNewData;
  const user = getUserById(id);
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (age) user.age = age;
  if (joined) user.joined = joined;
  if (spentShopping) user.spentShopping = spentShopping;
  await database.updateUser(id, user);
};

export const filterBySpentAmount = async (spent) => {
  console.log("GET request received in service");
  return await database.filterBySpentAmount(spent);
};

export const showUsersByAvgTransaction = async () => {
  console.log("GET request received in service");
  const users = await database.getUsers();
  let userStats = [];
  for (let user of users) {
    const transactions = await transactionDatabase.getTransactionsByUserId(
      user._id
    );
    let sum = 0;
    for (const transaction of transactions) {
      sum += transaction.amount;
    }
    let avgTransaction = 0;
    if (sum == 0) user.avgTransaction = 0;
    else {
      avgTransaction = sum / transactions.length;
    }
    const newUser = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      joined: user.joined,
      spentShopping: user.spentShopping,
      avgTransaction: avgTransaction,
    };
    user = newUser;
    userStats.push(newUser);
  }
  return userStats.sort((a, b) =>
    a.avgTransaction > b.avgTransaction ? -1 : 1
  );
};
