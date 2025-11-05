require("dotenv").config();

const connectDb = require("../db/connect");
const Product = require("../models/product");
const products = require("./products.json");

// self-invoked function
(async () => {
  try {
    // connect db
    connectDb(process.env.MONGO_URI);
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
