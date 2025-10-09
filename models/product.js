const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "title must be provided!"],
      maxLength: [30, "title must not be more than 30 chars"],
    },
    imageUrl: {
      type: String,
      required: [true, "imageUrl must be provided!"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "price must be provided!"],
    },
    discountPrice: {
      type: Number,
    },
    company: {
      type: String,
      required: [true, "company must be provided!"],
      enum: {
        values: ["nike", "adidas", "vans", "puma"],
        message: "{VALUES} is not supported!",
      },
    },
    color: {
      type: String,
      required: [true, "color must be provided!"],
      enum: {
        values: ["black", "white", "red", "green", "blue"],
        message: "{VALUES} is not supported!",
      },
    },
    category: {
      type: String,
      required: [true, "category must be provided!"],
      enum: {
        values: ["sneakers", "flats", "sandals", "heels"],
        message: "{VALUES} is not supported!",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
