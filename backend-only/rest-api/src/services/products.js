import { v4 as uuidv4 } from "uuid";

import * as database from "../database/products.js";
//TODO add error handling

export const getProducts = async () => {
  console.log("GET request received in service");
  return await database.getProducts();
};

export const createProduct = async (product) => {
  console.log("POST request received in service");
  const productWithId = { ...product, _id: uuidv4() };
  try {
    await database.createProduct(productWithId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProductById = async (id) => {
  console.log(`GET request received for id ${id}`);
  const foundProduct = await database.getProductById(id);
  return foundProduct;
};

export const deleteProduct = async (id) => {
  console.log(`DELETE request received for id ${id}`);
  await database.deleteProduct(id);
};

export const updateProduct = async (id, productNewData) => {
  console.log(`PATCH request received for id ${id}`);
  const { name, price, category, availableNumber, description } =
    productNewData;
  const product = getProductById(id);
  if (name) product.name = name;
  if (price) product.price = price;
  if (category) product.category = category;
  if (availableNumber) product.availableNumber = availableNumber;
  if (description) product.description = description;
  await database.updateProduct(id, product);
};
