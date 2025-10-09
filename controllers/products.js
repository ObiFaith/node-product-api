const Products = require("../models/product");

const getProducts = async (req, res) => {
  const queryObjects = {};
  const { title, company, color, category } = req.query;

  // if (title) result.find({ title: { $regex: title, $options: 'i' } });

  if (color) queryObjects.color = color;
  if (company) queryObjects.company = company;
  if (category) queryObjects.category = category;

  const result = Products.find(queryObjects);

  res.status(200).json({
    success: true,
    message: "Products retrieved successfully!",
    products: await result,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      itemsPerPages: 1,
      totalProducts: 5,
    },
  });
};

module.exports = { getProducts };
