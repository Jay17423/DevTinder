const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user.js");
app.use(express.json());

app.post("/signup", async (req, res) => {
  const userObj = req.body;
  try {
    //Creating a new instance of the user model
    const user = new User(userObj);
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Get User details by the Email id

app.get("/user", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email: email });
    if (user.length === 0) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

//Get All the user details

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete the user

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update the user Details

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate(userId, data,{ runValidators: true });
    res.send("User Updated Successfully");
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
