const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./db");
const user = require("./routes/user.js");
const account = require("./routes/account.js");
const cors = require("cors");
// Initialize express app
const app = express();
// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
dbConnect();

//cors
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// User-related routes (handled in routes/user.js)
app.use("/api/v1", user);
// user-Balances
app.use("/api/v1/account", account);
// Start the server and listen on the defined port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
