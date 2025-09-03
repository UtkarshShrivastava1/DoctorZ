const express=require("express");
const registerRoute=express.Router();
const {insertUser,showUser} =require("../controllers/registerController")


// Base Route
registerRoute.get('/', (req, res) => {
  res.send('Register Route!');
});


registerRoute.post("/insertUser",insertUser);

registerRoute.get("/showUser",showUser)




module.exports=registerRoute;