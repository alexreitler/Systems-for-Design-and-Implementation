import express from "express";

import {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/products.js";

const router = express.Router(); //create a router

//all routes in here are starting with /products

router.get("/", getProducts); //handle GET request to /products

router.post("/", createProduct); //handle POST request to /products

router.get("/:id", getProductById); //handle GET request to /products with an id

router.delete("/:id", deleteProduct); //handle DELETE request to /products with an id

router.patch("/:id", updateProduct); //handle PATCH request to /products with an id

export default router; //export the router so we can use it in index.js
