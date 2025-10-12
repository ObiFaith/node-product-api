const Products = require("../models/product");

const getProducts = async (req, res) => {
  const {
    name,
    color,
    company,
    category,
    numberFilter,
    sort = "createdAt",
  } = req.query;

  const currentPage = Number(req.query.page) || 1;
  const itemsPerPage = Number(req.query.limit) || 10;

  const operationMap = {
    ">": "$gt",
    "<": "$lt",
    "=": "$eq",
    ">=": "$gte",
    "<=": "$lte",
  };

  const queryObjects = {};

  if (color) queryObjects.color = color;
  if (company) queryObjects.company = company;
  if (category) queryObjects.category = category;
  if (name) queryObjects.name = { $regex: name, $options: "i" };

  if (numberFilter) {
    const regEx = /\b(<|>|<=|>=|=)\b/g;
    const options = ["price", "ratings", "numReviews"];
    const filters = numberFilter.replace(
      regEx,
      match => `-${operationMap[match]}-`
    );

    filters.split(",").forEach(item => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field))
        queryObjects[field] = { [operator]: Number(value) };
    });
  }

  const sortFields = sort.split(",").reduce((acc, field) => {
    acc[field.replace("-", "")] = field.startsWith("-") ? -1 : 1;
    return acc;
  }, {});

  const [products, totalItems] = await Promise.all([
    Products.find(queryObjects)
      .sort(sortFields)
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .lean(),
    Object.keys(queryObjects).length === 0
      ? Products.estimatedDocumentCount()
      : Products.countDocuments(queryObjects),
  ]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  res.status(200).json({
    success: true,
    message: "Products retrieved successfully!",
    products,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    },
  });
};

module.exports = { getProducts };
