const express = require('express');
const {bookAppointment,getAppointment,updateStatus,getPatientAppointment,getAllAppointmentsForUser} = require('../controllers/doctorAppointmentController');
const authMiddleware = require("../../Middleware/authMiddleware.js");
const router = express.Router();

router.post('/book',bookAppointment);
// router.put('/confirm/:id',confirmAppointment);
router.get('/doctor/getappointment/:id',getAppointment);  // ✅ Get Appointment by Doctor for particular doctor
// router.put('/:id/status',,updateStatus);
router.put("/:id/status", (req, res, next) => {
  console.log("🚀 Route HIT:", req.params, req.body);
  next();
}, updateStatus);
router.get("/User/all", getAllAppointmentsForUser);

router.get('/patient/status/:id',getPatientAppointment);

module.exports = router;