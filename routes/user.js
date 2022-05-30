const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const fetchUser = require("../middleware/fetchuser");
const secret = "MyNameIsNouman";

// Creating a User using POST

router.post(
  "/signup",
  [
    body("email", "invalid email").isEmail(),
    body("password", "password must be 3 chars long").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success });
    }
    try {
      const user = new User(req.body);
      await user.save();
      const token = jwt.sign({ id: user.id }, secret);
      success = true;
      res.json({ token, success });
    } catch (error) {
      res.status(401).send({ error: error.message, success: false });
    }
  }
);

// Loggin in User

router.post(
  "/login",
  [
    body("email", "invalid email").isEmail(),
    body("password", "Enter password").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .send({ msg: "Please enter correct details", success });
      }
      if (user.password !== password) {
        return res
          .status(400)
          .send({ msg: "Please enter correct details", success });
      }

      const token = jwt.sign({ id: user.id }, secret);
      success = true;
      return res.json({ token, success });
    } catch (error) {
      res.send(error.message);
    }
  }
);
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select({ password: 0 });
    console.log(user);
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal sever error");
  }
});

module.exports = router;
