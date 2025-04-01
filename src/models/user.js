const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  },
  age: {
    type: Number,
    min:18,
  },

  gender: {
    type: String,
    validate(value){
      if(value !== "male" && value !== "female" && value !== "other"){
        throw new Error("Gender should be male,female or other");
      }
      
    },
    lowercase: true

  },
  photoUrl:{
    type: String,
    default:"https://th.bing.com/th/id/OIP.YVs8BKxuQUm7BjnoPvrwBgAAAA?rs=1&pid=ImgDetMain",
  },
  about:{
    type: String,
    default:"This is the default about",
  },
  skills:{
    type: [String],
  }
},{
  timestamps: true,
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

// while using unique : true always use create a unique index on the field by using the command db.users.createIndex({ email: 1 }, { unique: true }) using db compass shell then unique will works otherwise it will not work
