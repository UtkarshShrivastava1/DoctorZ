const Appointment = require("../models/doctorAppointment");
const transporter = require("../../mailer.js");  // import transporter

// ✅ Book Appointment
exports.bookAppointment = async(req,res)=>{
    try{
        const appointment = await Appointment.create({
            ...req.body,
        // patientId:req.user._id,
        // patientName: req.user.name,

        
        });
       
        res.status(201).json(appointment);
    }
    catch(err){
        res.status(400).json({message:"Error booking appointment",error:err.message});

    }
};

// ✅ Get  Appointment by ID(particular doctor) in doctor side
exports.getAppointment = async(req,res)=>{
    try{
       
      const doctorId = req.params.id;
     
      if (!doctorId) {
      return res.status(401).json({ message: "Doctor not authorized" });
    }


      const appointments = await Appointment.find({doctor:doctorId})
      .populate("patientId","name email")
      .populate("doctor", "name specialization");

      if(!appointments || appointments.length===0){
        return res.status(404).json({message:"No appointments found for this doctor"});

      }
      
      res.json(appointments);
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
};


// exports.updateStatus = async(req,res)=>{
//     try{
//         const{id}= req.params;
//         const{status} = req.body;   
        
//         if(!["Confirmed","Cancelled"].includes(status)) {
//             return res.status(400).json({message:"Invalid status"});
//         }
//         const updated = await Appointment.findByIdAndUpdate(id,{status},{new:true});

//         if(!updated) return res.status(404).json({message:"Appointment not found"});

//         res.json({message:`Appointment ${status}` , appointment:updated});
//     }
//     catch(err) {
//         res.status(400).json({error:err.message});
//     }
// };

// // ✅ Update Appointment Status 
// exports.updateStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;
//     console.log("Update Status Request:", req.body);
//     const appointment = await Appointment.findById(id)
//       .populate("patientId") // ✅ make sure patient info is available
//       .populate("doctor");
     
//     if (!appointment) {
//       return res.status(404).json({ message: "Appointment not found" });
//     }

//     appointment.status = status;
//     await appointment.save();
//    console.log("Appointment Data",appointment);
//     // ✅ send mail to patient
//     const mailOptions = {
//       from: "dewanganmitalee94@gmail.com",
//       to: appointment.patientId.email,
//       subject: "Confirmation of Appointment",
//       text: `Hello ${appointment.patientId.name},

// Thank you for booking an appointment with Dr. ${appointment.doctor.name}. 
// Your appointment has been ${appointment.status} on ${appointment.date} at ${appointment.time}.

// Best Regards,
// MediConnect.com`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.json({ success: true, appointment });
//   } catch (error) {
//     console.error("Error updating appointment:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



// ✅ Update Appointment Status 
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findById(id).populate("doctor");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    // ✅ send mail to patient
    const mailOptions = {
      from: "dewanganmitalee94@gmail.com",
      to: appointment.patientEmail,   // use schema field
      subject: "Confirmation of Appointment",
      text: `Hello ${appointment.patientName},

Thank you for booking an appointment with Dr. ${appointment.doctor.name}. 
Your appointment has been ${appointment.status} on ${appointment.date} at ${appointment.time}.

Best Regards,
MediConnect.com`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, appointment });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};






// exports.confirmAppointment = async(req,res)=>{
//     try{
//         const {id} = req.params;

//         const appointments = await Appointment.find({
//             _id:id,
//             status:"Confirmed"
//         }).populate("doctor","name specialization");

//         if(!appointments || appointments.length===0){
//             return res.status(404).json({message:" No confirmed Appointment found"});
//         }
//         res.json(appointments);
//     }
//     catch(err){
//        res.status(500).json({message:"Error confirming appointment",error:err.message});
//     }
// }

// ✅ Get Patient Appointment for particular doctor in user side
exports.getPatientAppointment = async(req,res)=>{
    try{
        const patientId = req.params.id;

        const appointments = await Appointment.find({patientId})
        .populate("doctor","name specialization");

        if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

       res.json(appointments);
    }
    catch(err){
        res.status(500).json({message:"Error fetching appointments",error:err.message});
    }
}

// ✅ Get ALL Appointments (for user/super view)
exports.getAllAppointmentsForUser = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "name specialization")
      .populate("patientId", "name email"); // populate patient info

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all appointments", error: err.message });
  }
};
