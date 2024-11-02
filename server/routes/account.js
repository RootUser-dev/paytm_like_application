const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { getBalance, tranfer } = require("../controllers/accountCtrl");

const router = express.Router();

router.get("/getbalance", authMiddleware, getBalance);

router.post("/transfer", authMiddleware, tranfer);
module.exports = router;
