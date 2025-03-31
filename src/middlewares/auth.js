const adminAuth = (req,res,next)=>{
  console.log("Admin auth is getting Checked");
  
  const token = "xyzjgdfgdf";
  const isAdminfAuthorized =  token === "xyzjgdfgdf";
  if(!isAdminfAuthorized){
    return res.status(401).send("Unauthorized");
  }
  else{
    next();
  }
};

const userAuth = (req,res,next)=>{
  console.log("Admin auth is getting Checked");
  
  const token = "xyzjgddfgfdfgdf";
  const isAdminfAuthorized =  token === "xyzjgdfgdf";
  if(!isAdminfAuthorized){
    return res.status(401).send("Unauthorized");
  }
  else{
    next();
  }
};


module.exports = {adminAuth,userAuth};