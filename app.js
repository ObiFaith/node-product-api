require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectDb = require("./db/connect");
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
    connectDb(process.env.MONGO_URI);
    // run application
    app.listen(port, () => {
      console.log(`Server running at ${port}...`);
    });
  } catch (error) {
    console.log("Error while running app:", error.message);
  }
})();
