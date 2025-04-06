const express = require("express");
const {validateSignUpData} = require("../utils/validation.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //Validate the data
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("User saved successfully");
  } catch (error) {
    res.status(500).send("Error saving the user " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //Check for the email validation
    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //Create  a jwt token
      const token = await user.getJWT();
      res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
      res.send("User logged in successfully");
    } else {
      throw new Error("Password is not valid");
    }
  } catch (error) {
    res.status(500).send("ERROR " + error.message);
  }
});

module.exports = authRouter;