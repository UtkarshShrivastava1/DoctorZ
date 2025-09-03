const express = require("express");
const { getAllLabs,updateStatus,getBookedTest,getPatients,getLabById,updateLab,searchLabs,deleteLab } = require("../controllers/labsController.js");
const { labTestBooking } = require("../controllers/labsController.js");
const verifyToken = require("../../Middleware/authMiddleware.js");
const router = express.Router();
router.get("/test", (req, res) => {
  res.send("Lab routes are working!");
});

router.get("/all",getAllLabs);
router.post("/testBooking",labTestBooking);
router.patch("/updateStatus/:bookingId",updateStatus);
router.get("/getBookedTest/:id",getBookedTest);
router.get("/getPatients/:id",getPatients);
router.get("/getLab/:id",getLabById);
router.put("/updateLab/:id",updateLab);
router.get("/search",searchLabs);
router.delete("/deleteLab/:id",deleteLab);
module.exports = router;