import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import doctorimg from "../../assets/doctorimg.jpg";
import axios from "axios";

function DoctorProfile() {
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("doctorToken");
        console.log("Using token:", token);

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/doctors/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDoctor(res.data);
        setLoading(false);
        console.log(res.data);
      } catch (error) {
        setLoading(false);
        console.log("Error fetching doctor profile:", error);
      }
    };
    fetchDoctor();
  }, []);

  const handleClick = () => {
    if (!doctor || !doctor._id) {
      alert("Doctor data missing");
      return;
    }
    navigate("/appointmentForm", { state: { doctor } });
  };

  if (loading) return <p className="text-center">Loading doctor details...</p>;

  return (
    <div className="bg-white mt-20 mb-6 rounded-2xl shadow-xl md:mx-auto  overflow-hidden m-9 max-w-5xl   relative px-4 sm:px-6 lg:px-8">
      {/* Decorative Circles */}
      <div className="absolute -top-16 -left-16 w-40 h-40 sm:w-48 sm:h-48 bg-blue-700 rounded-full opacity-20"></div>
      <div className="absolute -bottom-16 -right-16 w-48 h-48 sm:w-64 sm:h-64 bg-blue-700 rounded-full opacity-20"></div>

      <div className="relative p-6 sm:p-10 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Doctor Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={doctorimg}
            alt="Doctor"
            className="w-40 h-40 sm:w-56 sm:h-56 object-cover rounded-xl shadow-lg border-4 border-white"
          />
        </div>

        {/* Doctor Info */}
        <div className="w-full md:w-2/3 space-y-6 text-center md:text-left">
          <div>
            <p className="text-gray-500 italic">Doctor’s Profile</p>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {doctor.name}
            </h2>
            <p className="text-base sm:text-lg font-semibold text-blue-700">
              {doctor.specialization}
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              {doctor.description}
            </p>
          </div>

          {/* Experience & Language */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 text-sm sm:text-base">
            <div>
              <p className="font-semibold text-gray-700">Experience:</p>
              <p className="text-blue-700">{doctor.experience}+ Years</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Language:</p>
              <p className="text-blue-600">Hindi, English</p>
            </div>
          </div>

          {/* Speciality */}
          <div>
            <p className="font-semibold text-gray-700 mb-1">
              Speciality: {doctor.specialization}
            </p>
          </div>

          {/* Appointment Call Section */}
          <div className="bg-blue-500 text-white px-4 sm:px-6 py-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 shadow-md">
            <p className="font-semibold">Call for appointment</p>
            <p className="text-base sm:text-lg font-bold">{doctor.mobile}</p>
            <button
              onClick={handleClick}
              className="px-4 sm:px-5 py-2 bg-white text-blue-600 font-medium rounded-lg shadow hover:bg-gray-100 transition w-full sm:w-auto"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
