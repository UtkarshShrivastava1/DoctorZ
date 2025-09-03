import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Register from './Register';
import { useNavigate } from 'react-router-dom';

import AppointScheduling from './AppointScheduling';
import ManageAppointment from './ManageAppoinment';
import StaffRegister from './StaffRegister';
import axios from 'axios';

const DashboardLayout = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    todaysAppointments: 0,
    totalPatients: 0,
    completedAppointments: 0,
    cancellations: 0,
  });
  const [upcoming, setUpcoming] = useState([]);

  const fetchDashboardData = async () => {
     const token = localStorage.getItem("staffToken");  // <-- yeh add karo

    try {
      const resStats = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/dashboard/stats`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
      setStats(resStats.data);

      const today = new Date().toISOString().split("T")[0];
      const resUpcoming = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/dashboard/upcoming/${today}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
// console.log(resUpcoming.data);

// console.log(resUpcoming.data.appointments);

      setUpcoming(resUpcoming.data.appointments);

    } catch (err) {
      console.error("Error fetching dashboard data", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // logout ke liye
const handleLogout = () => {
  if (window.confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("staffToken");
    navigate('/login');
  }
};


  const linkClasses = (tab) =>
    `block px-4 py-2 rounded hover:bg-blue-100 ${
      activeTab === tab ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700'
    }`;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">📊 Dashboard Overview</h2>
              <p className="text-gray-600">Welcome back! Here's a summary of your appointment activity.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-lg font-semibold text-gray-700">📅 Today's Appointments</h3>
                <p className="mt-2 text-3xl font-bold text-blue-600">{stats.todaysAppointments}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-lg font-semibold text-gray-700">👥 Total Patients</h3>
                <p className="mt-2 text-3xl font-bold text-green-600">{stats.totalPatients}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-lg font-semibold text-gray-700">✅ Completed Appointments</h3>
                <p className="mt-2 text-3xl font-bold text-purple-600">{stats.completedAppointments}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-5">
                <h3 className="text-lg font-semibold text-gray-700">❌ Cancellations</h3>
                <p className="mt-2 text-3xl font-bold text-red-600">{stats.cancellations}</p>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📌 Upcoming Appointments</h3>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slot</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {upcoming.map((appt, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{appt.userName}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{appt.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{appt.slot}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                            appt.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : appt.status === "Completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {appt.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {upcoming.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center text-gray-500 py-4">No upcoming appointments</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {upcoming.length === 0 ? (
                  <div className="text-gray-500 text-center">No upcoming appointments</div>
                ) : (
                  upcoming.map((appt, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded shadow-sm">
                      <div className="text-sm text-gray-700"><span className="font-semibold">👤 Patient:</span> {appt.userName}</div>
                      <div className="text-sm text-gray-700"><span className="font-semibold">📅 Date:</span> {appt.date}</div>
                      <div className="text-sm text-gray-700"><span className="font-semibold">⏰ Slot:</span> {appt.slot}</div>
                      <div className="text-sm mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                          appt.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : appt.status === "Completed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {appt.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        );

      case 'register':
        return <Register />;
      case 'schedule':
        return <AppointScheduling />;
      case 'manage':
        return <ManageAppointment />;
         case 'staffRegister':
        return <StaffRegister />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between bg-white p-4 shadow-md">
        <h1 className="text-lg font-bold">🗓️ Appointment System</h1>
        <button onClick={toggleSidebar} className="text-gray-600 focus:outline-none">
          {isSidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar (Desktop) */}
      <div className="hidden md:block md:w-64 bg-white shadow-lg p-4 h-full">
        <h1 className="text-xl font-bold mb-6">🗓️ Appointment System</h1>
        <nav className="space-y-2">
          <div onClick={() => setActiveTab('dashboard')} className={linkClasses('dashboard')}>📊 Dashboard</div>
          <div onClick={() => setActiveTab('register')} className={linkClasses('register')}>📝 User Registration</div>
          <div onClick={() => setActiveTab('schedule')} className={linkClasses('schedule')}>📅 Appointment Scheduling</div>
          <div onClick={() => setActiveTab('manage')} className={linkClasses('manage')}>🛠️ Manage Appointments</div>
           <div onClick={() => setActiveTab('staffRegister')} className={linkClasses('staffRegister')}>👤 Staff Register</div>
          <button onClick={handleLogout} className='block w-full text-left px-4 py-2 rounded text-red-600 hover:bg-red-100 font-semibold'>
 🚪 Logout
          </button>
        </nav>
      </div>

      {/* Sidebar (Mobile) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-white w-64 p-4 shadow-lg md:hidden">
          <h1 className="text-xl font-bold mb-6">🗓️ Appointment System</h1>
          <nav className="space-y-2">
            <div onClick={() => { setActiveTab('dashboard'); toggleSidebar(); }} className={linkClasses('dashboard')}>📊 Dashboard</div>
            <div onClick={() => { setActiveTab('register'); toggleSidebar(); }} className={linkClasses('register')}>📝 User Registration</div>
            <div onClick={() => { setActiveTab('schedule'); toggleSidebar(); }} className={linkClasses('schedule')}>📅 Appointment Scheduling</div>
            <div onClick={() => { setActiveTab('manage'); toggleSidebar(); }} className={linkClasses('manage')}>🛠️ Manage Appointments</div>
         <button
              onClick={() => { handleLogout(); toggleSidebar(); }}
              className="block w-full text-left px-4 py-2 rounded text-red-600 hover:bg-red-100 font-semibold"
            >
              🚪 Logout
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:ml-0">
        {renderContent()}
      </main>
    </div>
  );
};

export default DashboardLayout;
