const express = require("express");

const app = express();


app.use("/getUserData",(req,res) =>{
  try {
    throw new Error("Something went wrong");
    res.send("User Data Sent");
  } catch (error) {
    res.status(500).send("Some internal error has been occured contact Team!"); 
  }
})




app.listen(3000, () => console.log("Server  running on port 3000"));
