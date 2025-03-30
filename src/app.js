const express = require("express");

const app = express();

app.use("/admin",(req,res,next)=>{
  console.log("Admin auth is getting Checked");
  
  const token = "xyzjgdfgdf";
  const isAdminfAuthorized =  token === "xyzjgdfgdf";
  if(!isAdminfAuthorized){
    return res.status(401).send("Unauthorized");
  }
  else{
    next();
  }
});

app.get("/user",(req,res)=>{
  res.send("User Data");
})

app.get("/admin/getAllData",(req,res)=>{
  res.send("Admin Data"); 
})

app.get("/admin/deleteUser",(req,res)=>{
  res.send("User Deleted");
})


app.listen(3000, () => console.log("Server  running on port 3000"));
