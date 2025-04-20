const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const { validateProfileEditData } = require("../utils/validation.js");
const bcrypt = require("bcrypt");



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
      res.status(400).send("Please provide valid data");
      return;
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
    res.status(400).send(error.message);
  }

})

profileRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { oldPassword, newPassword } = req.body;
    const isPasswordValid = await bcrypt.compare(oldPassword,loggedInUser.password);
    if (!isPasswordValid) {
      throw new Error("Old password is not valid");
    }
    if (newPassword === oldPassword) {
      throw new Error("New password must be different from the old password");
    }
    if(newPassword.length < 8){
      throw new Error("New password must be strong password");
    }
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = newPasswordHash;
    await loggedInUser.save();  
    res.cookie("token",null, { expires: new Date(Date.now()) });  
    res.send("Password updated successfully");
  } catch (error) {
    res.send(error.message);
    
  }
});


module.exports = profileRouter;