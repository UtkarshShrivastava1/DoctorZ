import { useEffect, useState } from "react";

export default function Appointment() {
  const token = localStorage.getItem("token");
  let decodedUser = null;

  if (token) {
    try {
      const payload = token.split(".")[1];
      decodedUser = JSON.parse(atob(payload));
      console.log(decodedUser);
    } catch (err) {
      console.error("Invalid token", err);
    }
  }
  const id = decodedUser?._id?.toString();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/labs/getBookedTest/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.bookings || []);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📅 My Appointments</h2>

      {data.length > 0 ? (
         <div className="overflow-x-auto">
          <table className=" table-auto min-w-full border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Lab Name</th>
                <th className="px-6 py-3 text-left">Lab Location</th>
                <th className="px-6 py-3 text-left">Test Name</th>
                <th className="px-6 py-3 text-left">Booking Date</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((booking, i) => (
                <tr
                  key={i}
                  className={`${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition`}
                >
                  <td className="px-6 py-3 font-medium text-gray-800">
                    {booking.labId?.name || "N/A"}
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {booking.labId?.city}, {booking.labId?.state}
                  </td>
                  <td className="px-6 py-3 text-gray-700">{booking.testName}</td>
                  <td className="px-6 py-3 text-gray-700">
                    {new Date(booking.bookingDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td
                    className={`px-6 py-3 font-semibold ${
                      booking.status === "pending"
                        ? "text-yellow-600"
                        : booking.status === "completed"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {booking.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
       </div>
      ) : (
        <p className="text-gray-500 text-lg">No Appointments Found</p>
      )}
    </div>
  );
}
