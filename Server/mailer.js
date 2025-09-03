const nodemailer = require("nodemailer");

// yaha apna Gmail + App Password dalna hai
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ritika.vishwakarma29@gmail.com",        // apna Gmail
    pass: "zwzq ndoi rrvl hqnv",    // Google App Password (normal pwd nahi)
  },
});

module.exports = transporter;