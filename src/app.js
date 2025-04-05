const express = require("express");
const connectDB = require("./config/database");
const app = express();
const bcrypt = require("bcrypt");
const User = require("./models/user.js");
app.use(express.json());
const { validateSignUpData } = require("./utils/validation.js");
const validator = require("validator");
const cookieParser = require("cookie-parser");

const { userAuth } = require("./middlewares/auth.js");

app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Send Connection Request");
  res.send(user.firstName + " Sent Connection Request");
});

connectDB()
  .then(() => {
    console.log("Database connected Successfully");
    app.listen(3000, () => console.log("Server  running on port 3000"));
  })
  .catch((err) => {
    console.log("DataBase cannot be connected");
    console.log(err);
  });
