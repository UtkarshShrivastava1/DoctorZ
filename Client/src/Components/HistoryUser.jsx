// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

// const HistoryUser = () => {
//   const [appointments, setAppointments] = useState([]); // ✅ Initialize as array
//   const [selectedDate, setSelectedDate] = useState("") /// date input field 

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/appoinmentByUser/showUser");
//         console.log(res.data.user);
//         setAppointments(res.data.user); // ✅ Use res.data
//       } catch (err) {
//         alert("API fault");
//       }
//     };

//     fetchAppointments(); // ✅ Call the async function
//   }, []); // ✅ Add empty dependency array to run once


//   /// filterd apppointments on the selected date ---
//   const filteredAppointments = selectedDate ? appointments.filter((appt) => new Date(appt.date).toISOString().slice(0, 10) === selectedDate) : appointments;





//   return (
//     <div className="max-w-7xl mx-auto px-4 pt-32 py-3">
//       <h2 className="text-2xl font-bold mb-4">Your Appointment History</h2>
//       {/* Date Fillterd  */}
//       <div className='mb-4'>
//         <label htmlFor="date" className="mr-2 font-medium">Filtered By Date :</label>
//         <input type="date" id="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className='border px-2 py-1 rounded' />
//         {
//           selectedDate && (
//             <button onClick={() => setSelectedDate("")} className="ml-2 text-sm text-red-500 underline">
//               Clear Filter
//             </button>
//           )
//         }

//       </div>
//       {filteredAppointments.length === 0 ? (
//         <p>No appointments found.</p>
//       ) : (
//         filteredAppointments.map((user) => (
//           <div
//             key={user._id}
//             className="border p-4 mb-3 rounded shadow-md text"
//           >
//             <p><strong>Name:</strong> {user.userName}</p>
//             <p><strong>Email:</strong> {user.userEmail}</p>
//             <p><strong>Date:</strong> {user.date}</p>
//             <p><strong>Slot:</strong> {user.slot}</p>
//             <p><strong>Status:</strong> {user.status}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default HistoryUser;
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const HistoryUser = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/appoinmentByUser/showUser`);
        setAppointments(res.data.user);
      } catch (err) {
        alert("Failed to fetch appointments.");
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = selectedDate
    ? appointments.filter(
        (appt) => new Date(appt.date).toISOString().slice(0, 10) === selectedDate
      )
    : appointments;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-16">
      {/* Heading */}
        <div className='space-y-6'>
      <h2 className="text-4xl font-extrabold text-blue-700 leading-tight">
        Your Appointment <span className="text-blue-500">History</span>
      </h2>
      <p className="text-gray-600 mt-1 text-sm sm:text-base">
        Track your past and upcoming appointments with ease.
      </p>
    </div>

      {/* Filter section */}
      <div className="flex items-center flex-wrap gap-4 mt-6 mb-8">
        <label htmlFor="date" className="text-blue-700 font-medium">
          Filter by Date:
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-blue-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        {selectedDate && (
          <button
            onClick={() => setSelectedDate("")}
            className="text-sm text-red-600 underline hover:text-red-800 transition"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Appointments */}
      {filteredAppointments.length === 0 ? (
        <p className="text-gray-500 italic">No appointments found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map((user) => (
            <div
              key={user._id}
              className="bg-gradient-to-br from-blue-100 to-white border border-blue-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-transform hover:scale-[1.02]"
            >
              <h3 className="text-2xl font-semibold text-blue-800 mb-3">
                {user.userName}
              </h3>
              <p className="text-gray-700 text-sm">
                <strong>Email:</strong> {user.userEmail}
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Date:</strong> {new Date(user.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Slot:</strong> {user.slot}
              </p>
              <p
                className={`text-sm font-medium mt-4 ${
                  user.status === 'Confirmed'
                    ? 'text-green-600'
                    : user.status === 'Pending'
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}
              >
                Status: {user.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryUser;
