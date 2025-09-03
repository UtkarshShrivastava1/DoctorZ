const express=require("express");
const dashboardRoute=express.Router();
const {totalShow,upcomingShow} =require("../controllers/dashboardControllers");
const authMiddleware = require("../../Middleware/authMiddleware");

// Protect all dashboard routes
dashboardRoute.use(authMiddleware);


// base route for checking 
dashboardRoute.get("/",(req,res)=>{
    res.send("Hello DashBoard");
})


dashboardRoute.get("/stats",totalShow);
dashboardRoute.get("/upcoming/:date?",upcomingShow)



module.exports=dashboardRoute;