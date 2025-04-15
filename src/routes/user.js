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

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId", "firstName lastName email photoUrl about skills age");
    const data = connectionRequests.map((row) => row.fromUserId);
    res.json({
      message: "Connections fetched successfully",
      data,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = userRouter;
