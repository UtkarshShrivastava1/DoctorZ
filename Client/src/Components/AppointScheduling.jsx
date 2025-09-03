import React, { useState, useEffect } from "react";
import axios from "axios";

const MOCK_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
  "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
];

const AppointScheduling = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  // Fetch registered users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/registerUser/showUser`);
        if (res.data.status === 1) {
          setUsers(res.data.userRes);
        } else {
          alert("Users fetch nahi ho paaye");
        }
      } catch (err) {
        console.error("Frontend SE data Fetch Nahi ho Raha hai", err);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  // Fetch booked slots for selected date
  useEffect(() => {
    if (!selectedDate) {
      setBookedSlots([]);
      return;
    }

    const fetchBooked = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/appoinmentUser/appointments/booked-slots`, {
          params: { date: selectedDate },
        });
        if (res.data.status === 1) {
          setBookedSlots(res.data.bookedSlots || []);
        } else {
          alert("Slots fetch nahi ho paaye");
        }
      } catch (err) {
        console.error("Booked slots fetch error:", err);
      }
    };
    fetchBooked();
  }, [selectedDate]);

  const handleBooking = async () => {
    if (!selectedDate) return alert("Please select a date");
    if (!selectedSlot) return alert("Please select a time slot");
    if (!selectedUser) return alert("Please select a user");

    const selectedUserObj = users.find((user) => user._id === selectedUser);
    if (!selectedUserObj) return alert("Selected user not found!");

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/appoinmentUser/appointments/book`, {
        userId: selectedUser,
        userName: selectedUserObj.name,
        date: selectedDate,
        slot: selectedSlot,
      });

      if (res.data.status === 1) {
        alert("✅ Booking successful!");
        setBookedSlots([...bookedSlots, selectedSlot]);
        setSelectedSlot("");
        setSelectedUser("");
      } else {
        alert("❌ " + res.data.msg);
      }
    } catch (err) {
      console.error("Booking failed:", err);
      alert("❌ Server Error: Booking failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-6 text-center">📅 Appointment Slot Allocation</h2>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">📆 Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* User Select */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">👤 Select User</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- Choose User --</option>
          {loadingUsers ? (
            <option disabled>Loading users...</option>
          ) : (
            users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.idProof})
              </option>
            ))
          )}
        </select>
      </div>

      {/* Slot Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">🕒 Available Slots</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {MOCK_SLOTS.map((slot) => {
            const isBooked = bookedSlots.includes(slot);
            const isSelected = selectedSlot === slot;

            return (
              <button
                key={slot}
                disabled={isBooked}
                onClick={() => setSelectedSlot(slot)}
                className={`py-2 rounded text-sm font-medium transition ${
                  isBooked
                    ? "bg-red-300 text-white cursor-not-allowed"
                    : isSelected
                    ? "bg-green-600 text-white"
                    : "bg-green-100 hover:bg-green-200"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      {/* Book Button */}
      <button
        onClick={handleBooking}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        ✅ Book Appointment
      </button>
    </div>
  );
};

export default AppointScheduling;
