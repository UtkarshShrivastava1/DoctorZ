// Client/src/pages/Doctor/Alldoctor.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import DoctorCard from "./DoctorCard";

function Alldoctor() {
  const [specialization, setSpecialization] = useState("");
  const [location, setLocation] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  // Ensure base URL exists; trim trailing slashes
  const rawBase = import.meta.env.VITE_BACKEND_URL;
  const BASE_URL = rawBase ? rawBase.replace(/\/+$/, "") : "";
  if (!BASE_URL) {
    console.warn("VITE_BACKEND_URL is not set in your environment.");
  }

  // axios.defaults.withCredentials = true; // only if your API uses cookies

  const fetchDoctors = async (spec, loc, signal) => {
    try {
      setLoading(true);
      setErrorMsg(null);

      const params = {};
      if (spec && spec.trim()) params.specialization = spec.trim();
      if (loc && loc.trim()) params.location = loc.trim();

      const res = await axios.get(`${BASE_URL}/api/doctors/search`, {
        params,
        timeout: 15000,
        signal, // AbortController signal
      });

      setDoctors(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      if (axios.isCancel && axios.isCancel(e)) return; // for older axios
      if (e.name === "CanceledError") return; // for AbortController path
      if (e.response) {
        setErrorMsg(
          `Server error ${e.response.status}${
            e.response.statusText ? `: ${e.response.statusText}` : ""
          }`
        );
      } else if (e.request) {
        setErrorMsg(
          "Network or CORS issue: request reached the server but no valid response was received."
        );
      } else {
        setErrorMsg(`Error: ${e.message}`);
      }
      console.error("Error fetching doctors:", e);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchDoctors("", "", controller.signal);
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    const controller = new AbortController();
    fetchDoctors(specialization, location, controller.signal);
    // not storing controller here since this is a one-off click
  };

  const handleViewProfile = (doctor) => {
    if (doctor && doctor._id) navigate(`/doctor/${doctor._id}`);
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
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
            <Link
              to="/appointments"
              className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition text-center"
            >
              Appointment Status
            </Link>
          </div>
        </div>

        {/* Error banner */}
        {errorMsg && (
          <div className="w-full max-w-3xl bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded">
            {errorMsg}
          </div>
        )}

        {/* Missing env warning (dev only visual) */}
        {!BASE_URL && (
          <div className="w-full max-w-3xl bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded">
            VITE_BACKEND_URL is not set. Create a <code>.env</code> with
            <pre className="mt-1 whitespace-pre-wrap">{`VITE_BACKEND_URL=http://localhost:3000`}</pre>
            and restart the dev server.
          </div>
        )}
      </div>

      {/* 🩺 Doctors List */}
      <main className="max-w-7xl mx-auto px-4 mt-10">
        {loading ? (
          <p className="text-center text-gray-600 text-lg">
            Loading doctors...
          </p>
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
            {errorMsg
              ? "Could not load doctors."
              : "No doctors found. Try adjusting your search."}
          </p>
        )}
      </main>
    </div>
  );
}

export default Alldoctor;
