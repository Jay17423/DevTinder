const validator = require("validator");

const validateSignUpData = (body) => {
  const { firstName, lastName, email, password } = body;
  if (!firstName || !lastName) {
    throw new Error("First name and last name is required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

module.exports = { validateSignUpData };
