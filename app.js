require("dotenv").config();
require("express-async-errors");

const express = require("express");
const mongoose = require("mongoose");

const products = require("./products.json");
const ProductModel = require("./models/product");
const productRouter = require("./routes/products");

const NotFound = require("./middleware/notFound");
const ErrorHanler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

// routes
app.use("/api/v1/products", productRouter);

// middlewares
app.use(NotFound);
app.use(ErrorHanler);

const port = process.env.PORT;

// self-invoked function
(async () => {
  try {
    // connect db
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successful DB Connection!");
    // run application
    app.listen(port, () => {
      console.log(`Server running at ${port}...`);
    });
  } catch (error) {
    console.log("Failed: DB connection:", error);
  }
})();
