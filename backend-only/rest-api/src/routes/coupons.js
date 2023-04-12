import express from "express";

import {
  getCoupons,
  createCoupon,
  getCouponById,
  deleteCoupon,
  updateCoupon,
  validateCoupon
} from "../controllers/coupons.js";

const router = express.Router(); //create a router

//all routes in here are starting with /coupons

router.get("/", getCoupons); //handle GET request to /coupons

router.post("/", validateCoupon('createCoupon'), createCoupon); //handle POST request to /coupons

router.get("/:id", getCouponById); //handle GET request to /coupons with an id

router.delete("/:id", deleteCoupon); //handle DELETE request to /coupons with an id

router.patch("/:id", updateCoupon); //handle PATCH request to /coupons with an id

export default router; //export the router so we can use it in index.js
