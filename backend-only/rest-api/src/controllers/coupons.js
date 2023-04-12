import * as service from "../services/coupons.js";
import { validationResult, body } from "express-validator";

//TODO add error handling
export const getCoupons = async (req, res) => {
  console.log("GET request received in controller");
  const coupons = await service.getCoupons();
  //console.log(coupons);
  res.send(coupons);
};

export const validateCoupon = (method) => {
  switch (method) {
    case "createCoupon": {
      return [
        body("name", "Name is required").exists(),
        body("priceReduction", "Price reduction is required").exists().isInt({ min: 1, max: 99}),
        body("availableUntil", "Available until is required").exists(),
        body("category", "Category is required").exists(),
        body("ownerId", "Owner id is required").exists(),
      ];
    }
  }
}

export const createCoupon = async (req, res) => {
  console.log("POST request received");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = req.body;
  if (
    !body.name ||
    !body.priceReduction ||
    !body.availableUntil
  ) {
    res.status(400).send({ error: "Missing required fields" });
    return;
  }
  try {
    await service.createCoupon(req.body);
    res
      .status(201)
      .send(`Coupon with the name ${req.body.name} added to the database!`);
  } catch (error) {
    console.log(error);
    res.status(error?.status || 500).send({ error: error?.message || error });
  }
};

export const getCouponById = async (req, res) => {
  console.log(`GET request received for id ${req.params.id}`);
  const { id } = req.params;
  const foundCoupon = await service.getCouponById(id);
  res.send(foundCoupon);
};

export const deleteCoupon = async (req, res) => {
  console.log(`DELETE request received for id ${req.params.id}`);
  const { id } = req.params;
  await service.deleteCoupon(id);
  res.send(`Coupon with the id ${id} deleted from the database.`);
};

export const updateCoupon = async (req, res) => {
  console.log(`PATCH request received for id ${req.params.id}`);
  const { id } = req.params;
  const coupon = req.body;
  await service.updateCoupon(id, coupon);
  res.send(`Coupon with the id ${id} has been updated.`);
};
