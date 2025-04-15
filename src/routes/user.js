const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "intrested",
    }).populate("fromUserId", "firstName lastName email photoUrl about skills");
    res.json({
      message: "Connection requests fetched successfully",
      connectionRequests,
    });
  } catch (error) {
    req.status(400).json({ error: error.message });
  }
});

module.exports = userRouter;
