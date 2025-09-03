const express  =require('express');
const{registerDoctor,loginDoctor,getDoctorProfile,updateDoctorProfile,searchDoctor,getDoctorById,addDoctor, deleteDoctor} = require('../controllers/doctorController');
// const {verifyDoctor}  = require('../middleware/authMiddleware');
const authMiddleware = require("../../Middleware/authMiddleware.js");
const router = express.Router();

router.post('/register',registerDoctor);
router.post('/login',loginDoctor);
router.get('/profile',authMiddleware ,getDoctorProfile);
router.put('/update/profile',authMiddleware,updateDoctorProfile);
router.get('/search',searchDoctor);
router.post('/addDoctor',addDoctor);
router.get("/:id",getDoctorById);
router.delete("/delete/:id",authMiddleware,deleteDoctor);



module.exports = router;