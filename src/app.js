const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user.js");

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "jatn",
    lastName: "Kohli",
    email: "4k2wV@example.com",
    password: "123456",
    age: 21,
    gender: "male",
  };

  try {
    //Creating a new instance of the user model
    const user = new User(userObj);
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
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
