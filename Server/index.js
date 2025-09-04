// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db.js");

// Routes
const registerRoute = require("./App/routes/registerRoute");
const dashboardRoute = require("./App/routes/dashboardRoute");
const staffRoute = require("./App/routes/staffRoute");
const regisByUserRoute = require("./App/routes/regisByUserRoute");
const appoinmentByUserRoute = require("./App/routes/appoinmentByUserRoute");
const authRoutes = require("./App/routes/authRoutes");
const labRoutes = require("./App/routes/labRoutes");
const appointmentRoutes = require("./App/routes/doctorAppointmentRoutes");
const doctorRoutes = require("./App/routes/doctorRoutes");

const app = express();

/* ---------- Core middleware (MUST be before routes) ---------- */

// If you do NOT use cookies/credentials from the browser, keep "*" (widest support)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// If you DO use cookies (credentials: 'include'), swap the above with:
// app.use(cors({
//   origin: ["http://localhost:3000", "https://your-frontend-domain.com"],
//   credentials: true,
// }));

// Handle preflight requests explicitly (some proxies expect this)
app.options("*", cors());

// Parse JSON bodies once (you had it twice)
app.use(express.json());

/* ---------- Healthcheck (useful on Render) ---------- */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/* ---------- DB connection ---------- */
connectDB();

/* ---------- Routes ---------- */
app.use("/registerUser", registerRoute);
app.use("/dashboard", dashboardRoute);
app.use("/staffRoute", staffRoute);

app.use("/", regisByUserRoute);
app.use("/appoinmentByUser", appoinmentByUserRoute);
app.use("/api/auth", authRoutes);
app.use("/api/labs", labRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

// Root
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/* ---------- Error handler (keeps CORS headers on errors) ---------- */
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Server error",
  });
});

/* ---------- Start server ---------- */
const PORT = process.env.PORT || 3000;
// Render/most PaaS bind to 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
