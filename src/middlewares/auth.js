const jwt = require("jsonwebtoken");
const User = require("../models/user.js")
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token not found");
    }
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { userAuth };
