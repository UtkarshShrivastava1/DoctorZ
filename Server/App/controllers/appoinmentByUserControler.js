const appointmentModelByStaff = require("../models/appoinmentModel");
const appoinmentByUserModel = require("../models/appoinmentUserModel");
const nodemailer = require("nodemailer");

/// Node Mailer Transporter Banayenge---------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL, // your gmail
    pass: process.env.MY_PASS, // app password
  },
});

// insert User 
// const insertUser = async (req, res) => {
//   try {
//     const { userId, userName, userEmail, date, slot, status } = req.body;
//     const existUserByStaff = await appointmentModelByStaff.findOne({
//       date,
//       slot,
//       userId,
//     });
//     const exitstUser = await appoinmentByUserModel.findOne({
//       userId,
//       date,
//       slot,
//     });
//     if (existUserByStaff || exitstUser) {
//       return res.status(400).json({ status: 0, msg: "User Already Booked" });
//     }
//     const user = await appoinmentByUserModel({
//       userId,
//       userName,
//       userEmail,
//       date,
//       slot,
//       status,
//     });

//     const newUser = await user.save();

//     // Staff Ko email Bhejne Ka Trika
//     const mailoption = {
//       from: '"Clinic App" process.env.MY_EMAIL',
//       to: "shivanshuofficial123@gmail.com",
//       subject: "📅 New Appointment Request",
//       text: `New appointment booked by ${userName} on ${date} at ${slot}`,
//       Status: `Pending. 
// Please confirm in the dashboard.`,
//     };
//     await transporter.sendMail(mailoption)
//     res
//       .status(200)
//       .json({ status: 1, msg: "User Booked Successfully & Email Sent to Staff", newUser });
//   } catch (error) {
//     res.status(500).json({ status: 0, msg: "User Not Sucessfully Booked" });
//   }
// };
const insertUser = async (req, res) => {
  try {
    const { userId, userName, userEmail, date, slot, status } = req.body;

    // Validate basic input
    if (!userName || !userEmail || !date || !slot) {
      return res.status(400).json({ status: 0, msg: "Missing required fields" });
    }

    // Check if already booked (conditionally use userId if present)
    let existUserByStaff = null;
    let exitstUser = null;

    if (userId) {
      existUserByStaff = await appointmentModelByStaff.findOne({ date, slot, userId });
      exitstUser = await appoinmentByUserModel.findOne({ userId, date, slot });
    } else {
      // If no userId, fallback to checking by email + slot + date
      exitstUser = await appoinmentByUserModel.findOne({ userEmail, date, slot });
    }

    if (existUserByStaff || exitstUser) {
      return res.status(400).json({ status: 0, msg: "User Already Booked" });
    }

    const user = new appoinmentByUserModel({
      userId, // can be undefined — that's fine
      userName,
      userEmail,
      date,
      slot,
      status: status || "Pending",
    });

    const newUser = await user.save();

    // Send email to staff
    const mailoption = {
      from: process.env.MY_EMAIL,
      to: "shivanshuofficial123@gmail.com",
      subject: "📅 New Appointment Request",
      text: `New appointment booked by ${userName} on ${date} at ${slot}\nStatus: Pending`,
    };

    await transporter.sendMail(mailoption);

    res.status(200).json({
      status: 1,
      msg: "User Booked Successfully & Email Sent to Staff",
      newUser,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ status: 0, msg: "User Not Successfully Booked" });
  }
};




// show User
const showUser = async (req, res) => {
  try {

    const user = await appoinmentByUserModel.find();
    if (!user) {
      return res.status(404).json({ status: 0, msg: "Not Appointment Booked Yet!" })
    }
    res.status(201).json({ status: 1, msg: "User Show Sucessfully", user });
  } catch (error) {
    res.status(500).json({ status: 0, msg: "Not Shown Sucessfully" })
  }

}

/// update wala
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, slot, status } = req.body;

    const appoinmentUser = await appoinmentByUserModel.findByIdAndUpdate(
      id,
      { date, slot, status },
      { new: true }
    );

    if (!appoinmentUser) {
      return res.status(404).json({ status: 0, msg: "Appointment not found" });
    }

    // send email after update
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASS,
      },
    });

    const mailoption = {
      from: process.env.MY_EMAIL,
      to: appoinmentUser.userEmail, // Make sure DB field is correct
      subject: `Appointment ${status}`,
      text: `Hello ${appoinmentUser.userName},\n\nYour appointment on ${date} at ${slot} has been ${status}.\n\nThank you.`,
    };

    transporter.sendMail(mailoption, (error, info) => {
      if (error) {
        console.log("Email Error:", error);
      } else {
        console.log("Email Sent:", info.response);
      }
    });

    res.status(200).json({ status: 1, msg: "Update User Successfully", appoinmentUser });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ status: 0, msg: "Not Updated User Successfully" });
  }
};

// delete wala 
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ status: 0, msg: "User ID is not Exist" });
    }

    const deletedUser = await appoinmentByUserModel.findByIdAndDelete(id);

    res.status(200).json({
      status: 1,
      msg: "User Appointment Deleted Successfully",
      deletedUser: deletedUser,
    });
  } catch (err) {
    res.status(500).json({ status: 0, msg: "User Not Deleted Successfully" });
  }
};









const confirmAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    // update status
    const updatedAppointment = await appoinmentByUserModel.findByIdAndUpdate(
      appointmentId,
      { status: "Confirmed" },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ status: 0, msg: "Appointment not found" });
    }

    // 📩 Email to User (Confirmation)
    const mailOptions = {
      from: '"Clinic App" <yourclinic@gmail.com>',
      to: updatedAppointment.userEmail,  // user ke signup email se
      subject: "✅ Appointment Confirmed",
      text: `Hello, your appointment on ${updatedAppointment.date} at ${updatedAppointment.slot} has been CONFIRMED by our staff. 
Thank you for booking with us!`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      status: 1,
      msg: "Appointment Confirmed & Email Sent to User",
      updatedAppointment,
    });

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ status: 0, msg: "Error Confirming Appointment" });
  }
};

module.exports = { insertUser, confirmAppointment, showUser ,updateUser,deleteUser};
