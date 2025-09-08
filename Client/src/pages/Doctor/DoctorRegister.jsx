import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function DoctorRegister() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    mobile: "",
    hospital: "",
    location: "",
    fees: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/doctors/register`,
        formData
      );

      console.log(res.data);
      Swal.fire({
        title: "✅ Success!",
        text: "Doctor Registered Successfully",
        icon: "success",
        confirmButtonText: "Ok",
        customClass: "border-0",
      }).then(() => {
        setLoading(false)
        navigate("/doctor/login");
      });
    } catch (error) {
      setLoading(false)
      console.error(
        "Registration Error:",
        error.response?.data || error.message
      );
      Swal.fire({
        title: "❌ Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen   px-4">
      <div className="mt-25 mb-10 bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Doctor Registration
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
            />
          </div>

          {/* Password & Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
            />
          </div>

          {/* Specialization & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
            />
            <input
              type="number"
              name="experience"
              placeholder="Experience (in years)"
              value={formData.experience}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
            />
          </div>

          {/* Hospital & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="hospital"
              placeholder="Hospital / Clinic"
              value={formData.hospital}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
            />
          </div>

          {/* Fees */}
          <input
            type="number"
            name="fees"
            placeholder="Consultation Fee"
            value={formData.fees}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />

          {/* Timings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Available From
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Available Till
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow-md"
          >
            {loading ? "Signing up..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/doctor/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default DoctorRegister;
