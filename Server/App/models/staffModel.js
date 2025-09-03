const mongoose = require("mongoose");
const staffSChema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["staff", "admin"],
  },
});
const staffModel = mongoose.model("staff", staffSChema);
module.exports = staffModel;
