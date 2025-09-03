import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import DoctorCard from "./DoctorCard";

function Alldoctor() {
  const [specialization, setSpecialization] = useState("");
  const [location, setLocation] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(import.meta.env.VITE_BACKEND_URL)

  const fetchDoctors = async (specialization, location) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (specialization) params.append("specialization", specialization);
      if (location) params.append("location", location);

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/doctors/search?${params.toString()}`
      );
      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors("", "");
  }, []);

  const handleSearch = () => {
    fetchDoctors(specialization, location);
  };

  const handleViewProfile = (doctor) => {
    navigate(`/doctor/${doctor._id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* 🔍 Search Section */}
      <div className="mt-28 flex flex-col items-center gap-6 px-4">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full max-w-3xl bg-white p-4 shadow-md rounded-lg">
          <input
            type="text"
            placeholder="Search by Location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Search by Specialization..."
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex gap-2 w-full sm:w-auto justify-center">
            <button
              onClick={handleSearch}
              className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
            >
              Search
            </button>
            <Link
              to="/appointments"
              className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition text-center"
            >
              Appointment Status
            </Link>
          </div>
        </div>
      </div>

      {/* 🩺 Doctors List */}
      <main className="max-w-7xl mx-auto px-4 mt-10">
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading doctors...</p>
        ) : doctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                doctor={doctor}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No doctors found. Try adjusting your search.
          </p>
        )}
      </main>
    </div>
  );
}

export default Alldoctor;
