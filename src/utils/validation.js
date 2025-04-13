const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("First name and last name is required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

const validateProfileEditData = (req) => {
  const allowedEditFields = ["firstName", "lastName", "email", "photoUrl", "gender", "age", "about", "skills"];
  return Object.keys(req.body).every(field => allowedEditFields.includes(field));
};


module.exports = { validateSignUpData, validateProfileEditData };
