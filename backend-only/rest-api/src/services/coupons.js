import { v4 as uuidv4 } from "uuid";

import * as database from "../database/coupons.js";
import * as databaseUsers from "../database/users.js";
//TODO add error handling

export const getCoupons = async () => {
  console.log("GET request received in service");
  return await database.getCoupons();
};

export const createCoupon = async (coupon) => {
  console.log("POST request received in service");
  const couponWithId = { ...coupon, _id: uuidv4() };
  couponWithId.availableUntil = new Date(couponWithId.availableUntil);
  try {
    await database.createCoupon(couponWithId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCouponById = async (id) => {
  console.log(`GET request received for id ${id}`);
  const coupon = await database.getCouponById(id);
  const owner = await databaseUsers.getUserById(coupon.ownerId);
  return {coupon, owner};
};

export const deleteCoupon = async (id) => {
  console.log(`DELETE request received for id ${id}`);
  await database.deleteCoupon(id);
};

export const updateCoupon = async (id, couponNewData) => {
  console.log(`PATCH request received for id ${id}`);
  const {
    name,
    description,
    priceReduction,
    availableUntil,
    category,
    ownerId,
  } = couponNewData;
  const coupon = getCouponById(id);
  if (name) coupon.name = name;
  if (description) coupon.description = description;
  if (priceReduction) coupon.priceReduction = priceReduction;
  if (availableUntil) coupon.availableUntil = availableUntil;
  if (category) coupon.category = category;
  if (ownerId) coupon.ownerId = ownerId;
  await database.updateCoupon(id, coupon);
};
