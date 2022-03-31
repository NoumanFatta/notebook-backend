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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = new User(req.body);
      const result = await user.save();
      const token = jwt.sign({ id: user.id }, secret);
      res.json(result);
    } catch (error) {
      res.send(error.message);
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send("Please enter correct details");
      }
      if (user.password !== password) {
        return res.status(400).send("Please enter correct details");
      }

      const token = jwt.sign({ id: user.id }, secret);
      return res.json({ token });
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
