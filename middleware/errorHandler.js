module.exports = (err, _, res, __) => {
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
};
