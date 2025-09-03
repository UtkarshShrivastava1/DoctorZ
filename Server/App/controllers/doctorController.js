const Doctor = require('../models/doctorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.registerDoctor = async (req, res) => {
    try {
        const { name, email, password, specialization, experience, mobile,hospital, location,fees,startTime,endTime } = req.body;
        console.log(req.body);

        // check doctor already exists
        const doctorExists = await Doctor.findOne({ email });
        if (doctorExists) {
            return res.status(400).json({ message: 'Doctor already exists' });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);


        // create doctor
        const doctor = await Doctor.create({
            name,
            email,
            password: hashedPassword,   // ✅ Correct usage
            specialization,
            experience,
            mobile,
            hospital,
            location,
            fees,
            startTime,
            endTime,
        });
        
           res.status(201).json({ message: "Doctor registered successfully", doctor });
    } catch (error) {
         console.error("❌ Registration Error:", error); 
        res.status(500).json({ message: error.message });
    }
};


exports.loginDoctor = async(req,res)=>{
    try{
        const{email,password}= req.body;

        const doctor = await Doctor.findOne({email});

        if(doctor){
            const isMatch = await bcrypt.compare(password,doctor.password);
            if(!isMatch){
               return res.status(400).json({message:"Invalid email or Password"});

            }
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET,{expiresIn:"1d"});
           
            res.json({message:"Login Successful",token,doctor:{
                id:doctor._id,
                name:doctor.name,
                email:doctor.email,
                specialization:doctor.specialization,
                experience:doctor.experience,
                mobile:doctor.mobile,
                hospital:doctor.hospital,
                location:doctor.location,
                fees:doctor.fees,
                startTime:doctor.startTime,
                endTime:doctor.endTime,
            } 
                
            });
        }
        else{
            res.status(404).json({message:"Doctor Not Found"});            
        }
    }
    catch(error){
        console.error("❌ Login Error:",error);
        res.status(500).json({message:error.message});

    }
}


//get doctor profile
exports.getDoctorProfile = async(req,res)=>{

    try{
        const doctor = await Doctor.findById(req.doctor._id).select("-password");

        if(!doctor){
            return res.status(404).json({message:"Doctor not found"});
        }

        res.json(doctor);

    }
    catch(error){
        console.error("❌ Get Doctor Profile Error:",error);
        res.status(500).json({message:error.message});
    }
};


//update doctor profile
exports.updateDoctorProfile = async(req,res)=>{
    try{
        const doctor = await Doctor.findById(req.doctor._id);

        if(!doctor){
            return res.status(404).json({message:"Doctor not found"});
        }

        doctor.name = req.body.name||doctor.name;
        doctor.email = req.body.email||doctor.email;
        doctor.specialization = req.body.specialization||doctor.specialization;
        doctor.experience = req.body.experience||doctor.experience;
        doctor.mobile = req.body.mobile||doctor.mobile;
        doctor.hospital = req.body.hospital||doctor.hospital;
        doctor.location = req.body.location||doctor.location;
        doctor.fees = req.body.fees||doctor.fees;
        doctor.startTime = req.body.startTime||doctor.startTime;
        doctor.endTime = req.body.endTime||doctor.endTime;

        if(req.body.password){
            const hashedPassword = await bcrypt.hash(req.body.password,10);
            doctor.password = hashedPassword;
        }

        const updatedDoctor = await doctor.save();
        const doctorObj = updatedDoctor.toObject();
        delete doctorObj.password;
        res.json({message:"Doctor profile updated successfully",doctor:doctorObj});
    }
    catch(error){
        console.error("❌ Update Doctor Profile Error:",error);
        res.status(500).json({message:error.message});
    }
    };

    // exports.searchDoctor = async(req,res)=>{
    //     try{
    //         const {specialization} = req.query;
    //         console.log("Search Query Received:", specialization);
    //         let query = {};

    //         if(specialization && specialization.trim() !== ""){
    //             query.specialization = {$regex:specialization, $options:"i"};
    //         }
    //          console.log("MongoDB Query:", query);
    //         // .select("-password") → Excludes the password field from the result
    //             const doctors = await Doctor.find(query).select("-password");

    //             return res.status(200).json(doctors); 
    //         }
    //         catch(error){
    //             console.error(" Search Doctor Error:",error);
    //             res.status(500).json({message:error.message})
    //         }
    //     };

    

exports.searchDoctor = async (req, res) => {
  try {
    const { specialization, location } = req.query;
    console.log("Search Query Received:", { specialization, location });

    // Build dynamic query
    const query = {};
    if (specialization && specialization.trim() !== "") {
      query.specialization = { $regex: specialization, $options: "i" }; // case-insensitive
    }
    if (location && location.trim() !== "") {
      query.location = { $regex: location, $options: "i" };
    }

    console.log("MongoDB Query:", query);

    // Fetch doctors excluding password field
    const doctors = await Doctor.find(query).select("-password");

    return res.status(200).json(doctors);
  } catch (error) {
    console.error("Search Doctor Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Single Doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select("-password");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Add New Doctor (for admin)
exports.addDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(400).json({ message: "Error adding doctor", error: error.message });
  }
};

// ✅ Delete Doctor (for admin)
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting doctor", error: error.message });
  }
};