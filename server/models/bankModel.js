const mongoose = require("mongoose");

const bankModel = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  balance: { type: Number, required: true },
});

const Account = mongoose.model("Account", bankModel);

module.exports = Account;
