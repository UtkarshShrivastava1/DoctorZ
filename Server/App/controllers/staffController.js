const staffModel = require("../models/staffModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ========== Register Staff ==========
const registerStaff = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ status: 0, msg: "All fields are required" });
    }

    if (!["staff", "admin"].includes(role)) {
      return res.status(400).json({ status: 0, msg: "Invalid role provided" });
    }

    const existingUser = await staffModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ status: 0, msg: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new staffModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ status: 1, msg: "Staff registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ status: 0, msg: "Server error during registration" });
  }
};

// ========== Login Staff ==========
const loginStaff = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: 0, msg: "Email and password are required" });
  }

  try {
    const user = await staffModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: 0, msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 0, msg: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "secretKey",
    );

    res.status(200).json({
      status: 1,
      msg: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ status: 0, msg: "Server error during login" });
  }
};

module.exports = { registerStaff, loginStaff };
