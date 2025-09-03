const regisByUserModel = require("../models/regisByUserModel");
const registerModel=require("../models/registerModel");
const nodemailer=require('nodemailer');

// Transporter
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
          user: process.env.MY_EMAIL, // your gmail
        pass: process.env.MY_PASS, // app password
    }
})
const insertUser = async (req, res) => {
    try {
        const { name, age, gender, email, contact, idProof,isConfirmed} = req.body;
        const existUser = await regisByUserModel.findOne({ idProof, email });
        const existUserByStaff=await registerModel.findOne({idProof});
        if (existUser || existUserByStaff ) {
            return res.status(400).json({ status: 0, msg: "User Already Registered" });
        }
        const user = new regisByUserModel({
            name,
            age,
            gender,
            email,
            contact,
            idProof,
            isConfirmed,
        });

       const newUser = await user.save();
       // Staff Conformation Email----
        //   const confirmationLink = `${process.env.BASE_URL}/confirm-user/${newUser._id}`;
        //   await transporter.sendMail({
        //     from:process.env.MY_EMAIL,
        //     to:"shivanshuofficial123@gmail.com",
        //      subject: "Confirm New User Registration",
        //     html: `
        //         <h3>New User Registration</h3>
        //         <p><b>Name:</b> ${name}</p>
        //         <p><b>Email:</b> ${email}</p>
        //         <p><b>Contact:</b> ${contact}</p>
        //         <p>Click the link below to confirm:</p>
        //         <a href="${confirmationLink}">${confirmationLink}</a>
        //     `,
        //   })



      return  res.status(200).json({ status: 1, msg: "User Registration Sucessfully"});
    } catch (error) {
       return res.status(500).json({ status: 0, msg: "Error in registration" });
    }

}

// const confirmUser=async(req,res)=>{
//     try{
//         const {id}=req.params;
//         const user=await regisByUserModel.findById(id);
//         if(!user)return res.status(400).json({status:0,msg:"User Not Found"});
//         user.isConfirmed=true;
//         await user.save();
//         // await transporter.sendMail({
//         //      from: process.env.MY_EMAIL,
//         //     to: user.email,
//         //     subject: "Registration Successful",
//         //     html: `<h3>Hello ${user.name},</h3><p>Your registration has been confirmed by staff. Welcome!</p>`,
//         // });
//         res.send("<h1>User Registration Conformed Sucessfully</h1>")
//     }catch(error){
//         res.status(500).send("Error Confroming User")
//     }

// }

const showUser=async(req,res)=>{
    try{

        const user=await regisByUserModel.find();
        res.status(200).json({status:1,msg:"Show Registered User",user})
    }catch(err){
        res.status(500).json({status:0,msg:"Not Show Registerd User"})
    }
}

module.exports = { insertUser ,showUser}