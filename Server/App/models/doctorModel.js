const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    specialization:{
        type:String,
        required:true,
    },
    experience:{
        type:Number,
        required:true,
    },
    mobile:{
        type:String,
        required:true,

    },
    hospital:{
        type:String,
        required:true,
        
    },
    location:{
        type:String,
        required:true,
    },
    fees:{
        type:Number,
        required:true,
    },
    startTime:{
        type:String,
        required:true,
    },
    endTime:{
        type:String,
        required:true,
    },

},{timestamps:true})

module.exports = mongoose.model('Doctor',doctorSchema);