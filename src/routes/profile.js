const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const { validate } = require("../models/user.js");
const { validateProfileEditData } = require("../utils/validation.js");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if(!validateProfileEditData(req)){
      throw new Error("Invalid Edit request");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) =>{
      (loggedInUser[key] = req.body[key]);
    })
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName} Your profile updated successfully`,
      user: loggedInUser,
    });
  
  } catch (error) {
    res.send(error.message);
  }

})


module.exports = profileRouter;