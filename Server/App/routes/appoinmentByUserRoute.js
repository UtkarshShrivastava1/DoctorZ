const express=require("express");
const {insertUser,confirmAppointment,showUser,updateUser,deleteUser}=require("../controllers/appoinmentByUserControler")

const appoinmentByUserRoute=express.Router();

// base route
appoinmentByUserRoute.get("/",(req,res)=>{
    res.send("Appointment By User ")
});

appoinmentByUserRoute.post("/insertUser",insertUser);

appoinmentByUserRoute.get("/confirm-user/:id", confirmAppointment);
appoinmentByUserRoute.get("/showUser", showUser);
appoinmentByUserRoute.put("/updateUser/:id",updateUser);
appoinmentByUserRoute.delete("/deleteUser/:id",deleteUser);


module.exports=appoinmentByUserRoute;