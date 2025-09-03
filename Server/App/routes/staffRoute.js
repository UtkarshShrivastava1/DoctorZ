const express = require("express");
const staffRoute = express.Router();
const { registerStaff,loginStaff } = require("../controllers/staffController");

// Test route
staffRoute.get("/", (req, res) => {
  res.send("Staff Route");
});

// Staff registration
staffRoute.post("/registerStaff", registerStaff);
staffRoute.post("/login", loginStaff);

module.exports = staffRoute;
