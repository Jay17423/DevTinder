const express = require("express");
const { userAuth } = require("../middlewares/auth.js");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Send Connection Request");
  res.send(user.firstName + " Sent Connection Request");
});



module.exports = requestRouter;