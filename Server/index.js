const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db.js");

const app = express();

connectDB();
// Routes
const registerRoute = require("./App/routes/registerRoute");

const dashboardRoute = require("./App/routes/dashboardRoute");
const staffRoute = require("./App/routes/staffRoute");
// user by registration
const regisByUserRoute = require("./App/routes/regisByUserRoute");
const appoinmentByUserRoute = require("./App/routes/appoinmentByUserRoute");
const authRoutes = require("./App/routes/authRoutes");
const labRoutes = require("./App/routes/labRoutes");
const appointmentRoutes = require("./App/routes/doctorAppointmentRoutes");
const doctorRoutes = require("./App/routes/doctorRoutes");
// Middleware
// Middleware
app.use(
  cors({
    origin: "*", // allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.json());
app.use("/registerUser", registerRoute);

app.use("/dashboard", dashboardRoute);
app.use("/staffRoute", staffRoute);
//
app.use("/", regisByUserRoute);
app.use("/appoinmentByUser", appoinmentByUserRoute);
app.use("/api/auth", authRoutes);
app.use("/api/labs", labRoutes);

app.use("/api/doctors", doctorRoutes);

app.use("/api/appointments", appointmentRoutes);
// Root Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${process.env.PORT}`);
});

// Connect to MongoDB and Start Server
// mongoose
//   .connect(process.env.DBCONNECT, {
//     useNewUrlParser: true,

//   })
//   .then(() => {
//     console.log("✅ Mongoose is connected");

//     app.listen(process.env.PORT, () => {
//       console.log(`🚀 Server is running on http://localhost:${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ Mongoose connection failed:", err.message);
//   });
