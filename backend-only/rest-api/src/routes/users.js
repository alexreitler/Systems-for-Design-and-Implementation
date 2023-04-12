import express from "express";

import {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  filterBySpentAmount,
  showUsersByAvgTransaction,
  validateUser,
  createUserAndCoupons,
} from "../controllers/users.js";

const router = express.Router(); //create a router

//all routes in here are starting with /users
router.get("/", getUsers); //handle GET request to /users

router.post("/", validateUser("createUser"), createUser); //handle POST request to /users

router.get("/statistic/", showUsersByAvgTransaction); //handle GET request to /users/statistic

router.post("/withcoupons", createUserAndCoupons); //handle POST request to /users/withcoupons

router.get("/:id", getUserById); //handle GET request to /users with an id

router.delete("/:id", deleteUser); //handle DELETE request to /users with an id

router.patch("/:id", updateUser); //handle PATCH request to /users with an id

router.get("/filter/:spent", filterBySpentAmount); //handle GET request to /users/filter with a spent amount

export default router; //export the router so we can use it in index.js
