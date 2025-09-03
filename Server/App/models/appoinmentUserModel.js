const mongoose = require("mongoose");

const appoinmentByUserSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    slot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"], // Example statuses
      default: "Pending",
    },
    boookingTime: {
      // User ne kab book kiya (date+time)
      type: Date,
      default: Date.now, // Auto add karega current date & time
    },
  },
  {
    timestamps: true, // ✅ Ye automatically createdAt & updatedAt fields add karega
  }
);

const appoinmentByUser = new mongoose.model(
  "appointmentByUser",
  appoinmentByUserSchema
);
module.exports = appoinmentByUser;
