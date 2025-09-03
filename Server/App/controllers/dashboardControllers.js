const Patient = require("../models/registerModel");
const PatientUser=require("../models/regisByUserModel");
const Appointment = require("../models/appoinmentModel");
const AppointmentUser = require("../models/appoinmentUserModel");

const totalShow = async (req, res) => {
  try {
    const todayStr = new Date().toISOString().split("T")[0]; // '2025-08-10'

    const todaysAppointmentsCount = await Appointment.countDocuments({
      date: todayStr,
    });
    const todaysAppointmentsCountUser = await AppointmentUser.countDocuments({
      date: todayStr,
    });
    const totalTodaysAppointments =
      todaysAppointmentsCount + todaysAppointmentsCountUser;

    const PatientsCount = await Patient.countDocuments();
    const PatientsCountUser=await PatientUser.countDocuments();
    const totalPatients=PatientsCount+PatientsCountUser;

    const completedAppointmentsCount = await Appointment.countDocuments({
      status: "Completed",
      date: todayStr,
    });
    const completedAppointmentsCountUser = await AppointmentUser.countDocuments(
      {
        status: "Completed",
        date: todayStr,
      }
    );
    const todayCompletedAppointments =completedAppointmentsCount+completedAppointmentsCountUser

    const cancellationsCount = await Appointment.countDocuments({
      status: "Cancelled",
      date: todayStr,
    });
    const cancellationsCountUser = await AppointmentUser.countDocuments({
      status: "Cancelled",
      date: todayStr,
    });

    const totalCancellation = cancellationsCount + cancellationsCountUser;

    res.json({
      todaysAppointments: totalTodaysAppointments,
      totalPatients: totalPatients,
      completedAppointments: todayCompletedAppointments,
      cancellations: totalCancellation,
    });
  } catch (err) {
    console.error("Error in totalShow:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const upcomingShow = async (req, res) => {
  try {
    let dateParam = req.params.date;
    let todayDateStr = dateParam
      ? new Date(dateParam).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];

    // Upcoming Staff appointments
    const upcomingAppointments = await Appointment.find({
      date: { $gte: todayDateStr },
      status: { $in: ["Pending", "Confirmed"] },
    });
    // Upcoming User Appointments
    const upcomingAppointmentsUser = await AppointmentUser.find({
      date: { $gte: todayDateStr },
      status: { $in: ["Pending", "Confirmed"] },
    })
      .populate("userId", "userName")
      .sort({ date: 1 })
      .limit(5);
    // Merge both arrays (optional)
    const mergedAppointments = [
      ...upcomingAppointments,
      ...upcomingAppointmentsUser,
    ];
    res.json({
      status: 1,
      appointments: mergedAppointments,
    });
  } catch (err) {
    console.error("Error in upcomingShow:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { totalShow, upcomingShow };
