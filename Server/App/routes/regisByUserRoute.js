const express=require("express");
const regisByUserRoute=express.Router();
const {insertUser,showUser}=require("../controllers/registrationByUserCntrollers")


regisByUserRoute.get("/",(req,res)=>{
    res.send("Hello Register By User!")
})

regisByUserRoute.post("/insertUser",insertUser);
regisByUserRoute.get("/showUser",showUser);



// Staff confirmation link
// regisByUserRoute.get("/confirm-user/:id", confirmUser);


module.exports=regisByUserRoute;