const transporter = require("../../mailer.js");
  const { LabTestBookingModel,Lab } = require("../models/Lab.js");



  const getAllLabs=async(req,res)=>{
  try{
    const labs=await Lab.find();
    return res.status(200).json({message:"Labs Retrieved Successfully",labs});
  }
  catch(err){
    console.error(err);
    return res.status(500).json({message:"Server Error"});
  }
 }

const labTestBooking=async(req,res)=>{
  try{
     const{labId,userId,testName}=req.body;
     const labTestBooking=new LabTestBookingModel({labId,userId,testName});
     await labTestBooking.save();
     if(labTestBooking){
       return res.status(200).json({message:"Booking done Successfully"});
     }
     else{
       return res.status(400).json({message:"Booking Failed"});
     }
   


  }
  catch(err){
    console.error(err);
    return res.status(500).json({message:"Server Error"});
  }
 }

 const getBookedTest=async(req,res)=>{
  
  try{
    const {id}=req.params;
    const bookings=await LabTestBookingModel.find({userId:id}).populate("labId");
    return res.status(200).json({message:"Bookings Retrieved Successfully",bookings});





  }
  catch(err){
    res.status(500).json({message:"Server Error"});
  }
 }



 const getPatients = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Check Lab exists or not
    const lab = await Lab.findById(id);
    if (!lab) {
      return res.status(404).json({ message: "Lab not found" });
    }

    // Step 2: Fetch all patients (bookings) of that lab
    const patients = await LabTestBookingModel.find({ labId: id }).populate("userId");

    if (!patients || patients.length === 0) {
      return res.status(200).json({
        message: "No patients yet for this lab",
        patients: [],
      });
    }

    return res.status(200).json({
      message: "Patients Retrieved Successfully",
      patients,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};



const updateStatus = async (req, res) => {
  try{
     console.log("Booking ID:", req.params.bookingId);
    const id = req.params.bookingId;
    const {status}=req.body;
    const patient=await LabTestBookingModel.findByIdAndUpdate(  id,{status},{new:true}).populate("userId");
    if(!patient){
      return res.status(404).json({message:"Patient not found"});
    }
    const user=patient.userId;
    // await transporter.sendMail({
    //   from: 'ritika.vishwakarma29@gmail.com',
    //   to: user.email,
    //   subject: 'Patient Status Update',
    //   text:`Hello ${user.name},\n\nYour test for ${patient.testName} is ${status}.\n\nThank you for using our service.`,
    // })
    return res.status(200).json({message:"Patient status updated successfully",updatedBooking:patient});
  }
  catch(err){
    console.error(err);
    return res.status(500).json({message:"Server Error"});  

  }

}

 const getLabById=async(req,res)=>{
  try{
    const {id}=req.params;
    const lab=await Lab.findById(id);
    if(!lab){
      return res.status(404).json({message:"Lab not found"});
    }
    return res.status(200).json({message:"Lab Retrieved Successfully",lab});
  }
  catch(err){
    console.error(err);
    return res.status(500).json({message:"Server Error"});
  }
}

 const updateLab = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedLab = await Lab.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedLab) {
      return res.status(404).json({ message: "Lab not found" });
    }
    return res.status(200).json({ message: "Lab Updated Successfully", updatedLab });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


 const searchLabs = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      const allLabs = await Lab.find({});
      return res.status(200).json({ labs: allLabs });
    }

    // Split query into words for multi-word search
    const words = query.split(" ").filter(Boolean);

    // Build OR conditions dynamically for lab name, city, and test name
    const orConditions = words.flatMap((word) => [
      { name: { $regex: word, $options: "i" } },
      { city: { $regex: word, $options: "i" } },
      { "tests.name": { $regex: word, $options: "i" } },
    ]);

    const labs = await Lab.find({ $or: orConditions });

    res.status(200).json({ labs });
  } catch (err) {
    console.error("Error in searchLabs:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


 const deleteLab=async(req,res)=>{
  try{
    const {id}=req.params;
    const deletedLab=await Lab.findByIdAndDelete(id);
    if(!deletedLab){
      return res.status(404).json({message:"Lab not found"});
    }
    return res.status(200).json({message:"Lab Deleted Successfully"});
  }catch(err){
    console.error(err);
    return res.status(500).json({message:"Server Error"});
  }
}

module.exports = {
  getAllLabs,
  labTestBooking,
  getBookedTest,
  getPatients,
  updateStatus,
  getLabById,
  updateLab,
  searchLabs,
  deleteLab
};