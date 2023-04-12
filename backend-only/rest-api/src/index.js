import dotenv from "dotenv";
dotenv.config(); //Load the environment variables from the .env file
import express from "express";
import bodyParser from "body-parser"; //For parsing application/json
import usersRoutes from "./routes/users.js";
import productsRoutes from "./routes/products.js";
import couponsRoutes from "./routes/coupons.js";
import transactionsRoutes from "./routes/transactions.js";
import { swaggerDocs } from "./swagger.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());

app.use(bodyParser.json()); //For parsing application/json

app.use("/users", usersRoutes); //use the usersRoutes for all routes starting with /users

app.use("/products", productsRoutes); //use the productsRoutes for all routes starting with /products

app.use("/coupons", couponsRoutes); //use the couponsRoutes for all routes starting with /coupons")

app.use("/transactions", transactionsRoutes); //use the transactionsRoutes for all routes starting with /transactions

app.listen(process.env.PORT, () => {
  console.log(`API is listening on port http://localhost:${process.env.PORT}`); //Start the server on port 3000
  swaggerDocs(app, process.env.PORT);
});

//mongoose.connect(process.env.DB_CONNECTION);

try {
  mongoose.connect( process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}); 
  console.log("connected to db")   
  }catch (error) { 
  console.log("could not connect");    
  }