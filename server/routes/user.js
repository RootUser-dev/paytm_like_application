const express = require("express");

const {
  signUp,
  singin,
  updateProfile,
  getuser,
  getsingleuser,
} = require("../controllers/userCtrl");

const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/user/signup", signUp);

router.post("/user/signin", singin);

router.put("/user", authMiddleware, updateProfile);

router.get("/bulk", getuser);

router.get("/singleUser/:id", getsingleuser);

module.exports = router;
