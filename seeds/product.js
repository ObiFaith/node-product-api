require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("../models/product");
const products = require("../products.json");

// self-invoked function
(async () => {
  try {
    // connect db
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successful DB Connection!");
    // clear product collection
    await Product.deleteMany();
    console.log("Product model documents deleted!");
    // populate product collection
    await Product.create(products);
    console.log("Products added to product collection");
    process.exit(0);
  } catch (error) {
    console.log("Failed: DB connection:", error);
    process.exit(1);
  }
})();
