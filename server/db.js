const mongoose = require("mongoose");
const colors = require("colors");
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("the MongoDB is connected Successully".inverse);
  } catch (error) {
    console.log("MongoDB Connection Error".red, error.red);
  }
};

module.exports = dbConnect;
