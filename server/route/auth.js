const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const {
  register,
  login,
  refreshToken,
  logout,
} = require("../controler/auth_controler");
//register

router.post("/register", register);
//login
router.post("/login", login);
//refresh token
router.post("/refreshToken", refreshToken);
//logout
router.delete("/logout", logout);
module.exports = router;
