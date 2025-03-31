const express = require("express");
const connectDB = require("./config/database");
const app = express();

connectDB()
  .then(() => {
    console.log("Database connected Successfully");
    app.listen(3000, () => console.log("Server  running on port 3000"));
  })
  .catch((err) => {
    console.log("DataBase cannot be connected");
    console.log(err);
  });
                      