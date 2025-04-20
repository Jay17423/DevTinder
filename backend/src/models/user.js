const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 100,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      validate(vale) {
        if (!validator.isStrongPassword(vale)) {
          throw new Error("Your password is not strong");
        }
      },
      
    },
    age: {
      type: Number,
      min: 18,
    },

    gender: {
      type: String,
      validate(value) {
        if (value !== "male" && value !== "female" && value !== "other") {
          throw new Error("Gender should be male,female or other");
        }
      },
      lowercase: true,
    },
    photoUrl: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.YVs8BKxuQUm7BjnoPvrwBgAAAA?rs=1&pid=ImgDetMain",
      validate(vale) {
        if (!validator.isURL(vale)) {
          throw new Error("Photo url is not valid");
        }
      },
    },
    about: {
      type: String,
      default: "This is the default about",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (password) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid;
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

// while using unique : true always use create a unique index on the field by using the command db.users.createIndex({ email: 1 }, { unique: true }) using db compass shell then unique will works otherwise it will not work
