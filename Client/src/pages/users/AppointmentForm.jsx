import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AppointmentForm() {
  const token = localStorage.getItem("token");
  let decodedUser = null;

  if (token) {
    try {
      const payload = token.split(".")[1];
      decodedUser = JSON.parse(atob(payload));
    } catch (err) {
      console.error("Invalid token", err);
    }
  }
  const id = decodedUser?._id?.toString();
  const location = useLocation();
  const doctor = location.state?.doctor;
  const navigate = useNavigate();

  if (!doctor || !doctor._id) {
    return (
      <div className="text-center mt-10 text-red-600">
        No doctor selected. Please go back and select a doctor.
        <button
          onClick={() => navigate("/user/dashboard")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go to Doctors
        </button>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    patientGender: "",
    patientEmail: "",
    MobileNo: "",
    patientAddress: "",
    date: "",
    time: "",
    notes: "",
    status: "Pending",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/appointments/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, doctor: doctor._id, patientId: id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Something went wrong");
        return;
      }

      const data = await res.json();
      alert(
        `Appointment booked with Dr.${doctor.name} for ${formData.patientName} on ${formData.date} at ${formData.time}`
      );

      setFormData({
        patientName: "",
        patientAge: "",
        patientGender: "",
        patientEmail: "",
        MobileNo: "",
        patientAddress: "",
        date: "",
        time: "",
        notes: "",
        status: "Pending",
      });
    } catch (err) {
      alert("Error booking appointment" + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4 py-10">
      {/* Overlay */}
      <div className="absolute inset-0bg-opacity-60 "></div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="mt-14 relative bg-blue-900 bg-opacity-80 text-white p-6 sm:p-10 rounded-lg w-full max-w-3xl shadow-lg"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          APPOINTMENT FORM
        </h1>
        <h2 className="text-base sm:text-lg text-center mb-8">
          MAKE AN APPOINTMENT
        </h2>

        {/* Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block ">Patient Age</label>
            <input
              type="number"
              name="patientAge"
              value={formData.patientAge}
              onChange={handleChange}
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block ">Gender</label>
            <select
              name="patientGender"
              value={formData.patientGender}
              onChange={handleChange}
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block ">Phone Number</label>
            <input
              type="text"
              name="MobileNo"
              value={formData.MobileNo}
              onChange={handleChange}
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block ">Email</label>
            <input
              type="email"
              name="patientEmail"
              value={formData.patientEmail}
              onChange={handleChange}
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block ">Address</label>
            <input
              type="text"
              name="patientAddress"
              value={formData.patientAddress}
              onChange={handleChange}
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block ">Reasons for Visit</label>
            <textarea
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block ">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block ">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded text-lg font-semibold transition"
          >
            Make an appointment
          </button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentForm;
