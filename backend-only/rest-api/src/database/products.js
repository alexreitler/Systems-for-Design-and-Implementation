import Product from "../models/product.js";

export const getProducts = async () => {
  console.log("GET request received in database");
  const products = await Product.find().catch((error) => {
    console.log(error);
    throw { status: 500, message: error?.message || error };
  });
  //console.log(products);
  return products;
};

export const getProductById = async (id) => {
  console.log(`GET request received for id ${id} in database`);
  const products = await Product.findById(id).catch((error) => {
    console.log(error);
    throw { status: 500, message: error?.message || error };
  });
  //console.log(products);
  return products;
};

export const createProduct = async (product) => {
  console.log("POST request received in database");
  let newProduct = new Product(product);
  newProduct = newProduct
    .save()
    .then(() => {
      console.log(
        `Product ${product.name} created successfully with id ${product._id}`
      );
    })
    .catch((error) => {
      console.log(error);
      throw { status: 500, message: error?.message || error };
    });
};

export const updateProduct = async (id, product) => {
  console.log(`PATCH request received for id ${id} in database`);
  await Product.updateOne({ _id: id }, product).catch((error) => {
    console.log(error);
    throw { status: 500, message: error?.message || error };
  });
};

export const deleteProduct = async (id) => {
  console.log(`DELETE request received for id ${id} in database`);
  await Product.deleteOne({ _id: id }).catch((error) => {
    console.log(error);
    throw { status: 500, message: error?.message || error };
  });
};
