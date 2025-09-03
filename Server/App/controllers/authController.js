
const jwt = require("jsonwebtoken");


const LabUser = require("../models/User.js");

const bcrypt = require("bcrypt");

const { Lab } = require("../models/Lab.js");

 const registerUser = async (req, res) => {
  const { name, email, password, state, city, pincode } = req.body;

  if (!name || !email || !password || !state || !city || !pincode) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  //  const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   if(!passwordRegex.test(password)){
  //     return res.status(400).json({message:"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."});
  //   }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new LabUser({
      name,
      email,
      password: hashedPassword,
      state,
      city,
      pincode,
    });

    await user.save();
    return res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const loginUser=async(req,res)=>{
  const {email,password}=req.body;
  try{
    const user=await LabUser.findOne({email});
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(401).json({message:"Invalid Credentials"});
    }
    const token=jwt.sign(
      {_id:user._id
        ,name:user.name
        ,email:user.email
        ,state:user.state
        ,city:user.city
        ,pincode:user.pincode
      },process.env.JWT_SECRET,
       { expiresIn: "1h" }
    );
    return res.status(200).json({message:"User Logged In Successfully",token});
  }catch(err){
    console.error(err);
    return res.status(500).json({message:"Server Error"});
  }
}
 const updateUser = async (req, res) => {
  const {id}=req.params;
  const { name,email, state} = req.body; // email update karna optional hai
  try {
    const user = await LabUser.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email=email||user.email;
    user.state = state || user.state;
    await user.save();

    return res.status(200).json({ message: "User Updated Successfully", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};



const labsRegister = async (req, res) => {
  try {
    const { name, email, password, state, city, pincode, tests, timings } = req.body;

    if (!name || !email || !password || !state || !city || !pincode || !timings?.open || !timings?.close) {
      return res.status(400).json({ message: "Please fill all mandatory fields" });
    }
    const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!passwordRegex.test(password)){
      return res.status(400).json({message:"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."});
    }

    const existingLab = await Lab.findOne({ email });
    if (existingLab) {
      return res.status(400).json({ message: "Lab with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const lab = new Lab({
      name,
      email,
      password: hashedPassword,
      state,
      city,
      pincode,
      tests: tests || [],      // ab array of {name, price} aayega
      timings
    });

    await lab.save();

    return res.status(201).json({ message: "Lab Registered Successfully", labId: lab._id });

  } catch (err) {
    console.error("Lab Register Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};


 const labsLogin=async(req,res)=>{
  try{
    const {email,password}=req.body;
    const lab =await Lab.findOne({email});
    if(!lab){
      return res.status(404).json({message:"not found"});
    }
    const isMatch=await bcrypt.compare(password,lab.password);
    if(!isMatch){
      return res.status(401).json({message:"Invalid Credentials"});
    }
    console.log("Lab details:", lab);
    const token=jwt.sign(
      {
       lab

      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({message:"Login Successful",token});
  }
  catch(err){
    console.error(err);
    return res.status(500).json({message:"Server Error"});
  }
}



 const getUserById=async(req,res)=>{
  try{
    const {id}=req.params;
    const user=await LabUser.findById(id);
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    return res.status(200).json(user); 
  }
  catch(err){
    console.error(err);
    return res.status(500).json({message:"Server Error"});
  }
}


module.exports = {
  registerUser,
  loginUser,
  updateUser,
  labsRegister,
  labsLogin,
  getUserById
};