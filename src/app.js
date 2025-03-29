const express = require("express");

const app = express();


app.get("/ab?c ", (req, res) => {
  res.send("FirstName: Jay, LastName: Prakash");
})

app.get("/ab+ c ", (req, res) => {
  res.send("FirstName: Jay, LastName: Prakash");
})


app.get("/ab*cd", (req, res) => {
  res.send("FirstName: Jay, LastName: Prakash");
})




app.get("/user", (req, res) => {
  res.send("FirstName: Jay, LastName: Prakash");
})

app.post("/user", (req, res) => {
  // console.log("save data to database");
  res.send("Data saved to database");
})

app.use("/test", (req, res) => {
  res.send("Hello from the server!"); 
});

app.listen(3000, () => console.log("Server  running on port 3000"));
