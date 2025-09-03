const mongoose=require("mongoose");

const registerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    age:{
        type:Number,
        required:true,
        min:0,
    },
    gender:{
        type:String,
        enum: ['Male', 'Female', 'Other'], // Fixed choices
        required:true,
    },
    contact:{
        type:String,
        required:true,
        match: /^[0-9]{10}$/   // 10 digit mobile number
    },
     idProof: {
    type: String,
    required: true,
    unique: true           // Har user ka ID Proof unique hoga
  },
    createdAt: {
    type: Date,
    default: Date.now      // Auto insert ho jaayega
  },
});

const registerModel=mongoose.model("User",registerSchema);
module.exports=registerModel;