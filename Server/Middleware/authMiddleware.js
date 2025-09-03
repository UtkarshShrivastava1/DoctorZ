// const jwt = require("jsonwebtoken");

// const authMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ status: 0, msg: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretKey");
//     req.user = decoded; // contains userId and role
//     next();
//   } catch (error) {
//     return res.status(401).json({ status: 0, msg: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;


const jwt = require("jsonwebtoken");
const Doctor = require("../App/models/doctorModel");

// Auth middleware to verify token and attach user/doctor info
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ status: 0, msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretKey");

    // Attach decoded info (id, role) to req.user
    req.user = decoded;

    // Optional: if doctor exists, fetch from DB and attach
    const doctor = await Doctor.findById(decoded.id).select("-password");
    if (!doctor) {
      return res.status(404).json({ status: 0, msg: "Doctor not found" });
    }
    req.doctor = doctor;

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({ status: 0, msg: "Invalid token" });
  }
};

module.exports = authMiddleware;
