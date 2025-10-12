const mongoose = require("mongoose");

module.exports = async url => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successful DB Connection!");
  } catch (error) {
    console.log("DB Connection Failed:", error.message);
    process.exit(1);
  }
};
