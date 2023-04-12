import * as service from "../services/products.js";

//TODO add error handling
export const getProducts = async (req, res) => {
  console.log("GET request received in controller");
  const products = await service.getProducts();
  //console.log(products);
  res.send(products);
};

export const createProduct = async (req, res) => {
  console.log("POST request received");
  const body = req.body;
  if (
    !body.name ||
    !body.price ||
    !body.category ||
    !body.availableNumber ||
    !body.description
  ) {
    res.status(400).send({ error: "Missing required fields" });
    return;
  }
  try {
    await service.createProduct(req.body);
    res
      .status(201)
      .send(`Product with the name ${req.body.name} added to the database!`);
  } catch (error) {
    console.log(error);
    res.status(error?.status || 500).send({ error: error?.message || error });
  }
};

export const getProductById = async (req, res) => {
  console.log(`GET request received for id ${req.params.id}`);
  const { id } = req.params;
  const foundProduct = await service.getProductById(id);
  res.send(foundProduct);
};

export const deleteProduct = async (req, res) => {
  console.log(`DELETE request received for id ${req.params.id}`);
  const { id } = req.params;
  await service.deleteProduct(id);
  res.send(`Product with the id ${id} deleted from the database.`);
};

export const updateProduct = async (req, res) => {
  console.log(`PATCH request received for id ${req.params.id}`);
  const { id } = req.params;
  const product = req.body;
  await service.updateProduct(id, product);
  res.send(`Product with the id ${id} has been updated.`);
};
