import * as service from "../services/users.js";
import { createCoupon } from "../services/coupons.js";
import { validationResult, body } from "express-validator";

//TODO add error handling
export const getUsers = async (req, res) => {
  console.log("GET request received in controller");
  const users = await service.getUsers();
  //console.log(users);
  res.send(users);
};

export const validateUser = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("firstName", "First name is required").exists(),
        body("lastName", "Last name is required").exists(),
        body("age", "Age is required and must be over 18")
          .exists()
          .isInt({ min: 18, max: 100 }),
      ];
    }
    case "updateUser": {
      return [
        body("age", "Age must be a valid number").isInt({ min: 18, max: 100 }),
        body("joined", "Joined date must be a date").isDate(),
        body("spentShopping", "Spent amount mount be a positive number").isInt({
          min: 0,
        }),
      ];
    }
  }
};

export const createUser = async (req, res) => {
  console.log("POST request received");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const body = req.body;

  try {
    let userWithId = await service.createUser(req.body);
    res
      .status(201)
      .send(
        `User with the name ${userWithId.firstName} and ID ${userWithId._id} added to the database!`
      );
  } catch (error) {
    console.log(error);
    res.status(error?.status || 500).send({ error: error?.message || error });
  }
};

export const createUserAndCoupons = async (req, res) => {
  console.log("POST request received");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const body = req.body;

  try {
    let userWithId = await service.createUser(req.body.user);
    for (let coupon of req.body.coupons) {
      let couponWithOwnerId = { ...coupon, ownerId: userWithId._id };
      await createCoupon(couponWithOwnerId);
    }
    res
      .status(201)
      .send(
        `User with the name ${userWithId.firstName} and ID ${userWithId._id} added to the database with coupons`
      );
  } catch (error) {
    console.log(error);
    res.status(error?.status || 500).send({ error: error?.message || error });
  }
};

export const getUserById = async (req, res) => {
  console.log(`GET request received for id ${req.params.id}`);
  const { id } = req.params;
  const foundUser = await service.getUserById(id);
  res.send(foundUser);
};

export const deleteUser = async (req, res) => {
  console.log(`DELETE request received for id ${req.params.id}`);
  const { id } = req.params;
  await service.deleteUser(id);
  res.send(`User with the id ${id} deleted from the database.`);
};

export const updateUser = async (req, res) => {
  console.log(`PATCH request received for id ${req.params.id}`);
  const { id } = req.params;
  const user = req.body;
  await service.updateUser(id, user);
  res.send(`User with the id ${id} has been updated.`);
};

export const filterBySpentAmount = async (req, res) => {
  console.log("GET request received in controller");
  const { spent } = req.params;
  const users = await service.filterBySpentAmount(spent);
  //console.log(users);
  res.send(users);
};

export const showUsersByAvgTransaction = async (req, res) => {
  console.log("GET request received in controller");
  const users = await service.showUsersByAvgTransaction();
  //console.log(users);
  res.send(users);
};
