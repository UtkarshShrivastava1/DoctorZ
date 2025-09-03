import React from "react";
import doctorimg from "../../assets/doctorimg.jpg";

function DoctorCard({ doctor, onViewProfile }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 w-full max-w-sm mx-auto">
      {/* Doctor Image */}
      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500 shadow-md mb-4">
        <img
          src={doctorimg}
          alt={doctor.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Doctor Details */}
      <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
      <p className="text-blue-600 font-medium">{doctor.specialization}</p>
      <p className="text-sm text-gray-500 mt-1">📍 {doctor.location}</p>
      <p className="text-sm text-gray-600 mt-1">
        💰 Consultation Fee:{" "}
        <span className="font-semibold text-gray-800">₹{doctor.fees}</span>
      </p>

      {/* Button */}
      <button
        onClick={() => onViewProfile(doctor)}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        View Profile
      </button>
    </div>
  );
}

export default DoctorCard;
