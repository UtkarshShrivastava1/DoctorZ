const mongoose=require("mongoose");


const regisByUserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    age:{
        type:String,
        required:true,
        trim:true,
    },
    gender:{
        type:String,
        enum:['Male','Female','Other'],
        required:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        trim:true
    },
    contact:{
        type:String,
        required:true,
        match: /^[0-9]{10}$/   // 10 digit mobile number
    },
    idProof:{
        type:String,
        required:true,
        trim:true,
    },
    isConfirmed: { type: Boolean, default: false }
});

const regisByUserModel=mongoose.model("RegistrationByUser",regisByUserSchema);
module.exports=regisByUserModel;