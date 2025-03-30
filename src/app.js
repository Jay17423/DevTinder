const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res,next) => {
    next();
    res.send("Response from first middleware");
  },
  (req, res) => {
    res.send("Response from second middleware");
  },
  (req, res) => {
    res.send("Response from Third middleware");
  },
  (req, res) => {
    res.send("Response from fourth middleware");
  }
);

app.listen(3000, () => console.log("Server  running on port 3000"));
