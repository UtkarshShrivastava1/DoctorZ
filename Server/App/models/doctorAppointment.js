 const mongoose = require('mongoose');
 
 const appointmentSchema = new mongoose.Schema({
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required:true,
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    patientName:{
        type:String,
        required:true,  
    },
    patientEmail:{
        type:String,
        required:true,  
    },
     MobileNo:{
        type:String,
        required:true,
    },
     patientAddress:{
        type:String,
        required:true  ,
    }, 
    patientAge:{
        type:Number,
        required:true,
    },
    patientGender:{
        type:String,
        required:true,
    },
   
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    notes:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Confirmed","Cancelled"],
        default:"Pending"},
    },
    {timestamps:true});

    module.exports = mongoose.model("Appointment",appointmentSchema);
   