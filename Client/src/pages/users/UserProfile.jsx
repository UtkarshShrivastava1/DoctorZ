import { useState,useEffect } from "react";
import img2 from "../../assets/img2.webp";
import Appointment from "../../Components/Appointment";
import DoctorAppointmentHistory from "./DoctorAppointmentHistory";

function UserProfile() {
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

  
  const [user, setUser] = useState(decodedUser || { name: "", email: "", state: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // 👈 new state for tab switching



  useEffect(() => {
    console.log("User ID from token:", id);
    console.log("Sending token:", token);

    if (id) {
      fetch(`${import.meta.env.VITE_API_URL}/api/auth/user/${id}`, { method: "GET",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
       })
        .then((res) => {
          if(res.status===401 || res.status===403){
            console.log("Session expired. Redirecting to login...");
            window.location.href="/userLogin";
          }
          return res.json();
        })
        .then((data) => {
          if (data.message === "Invalid Token") {
          localStorage.removeItem("token");
          navigate("/login"); 
        } else {
          console.log("Fetched user:", data);
          setUser(data);
         } 
        })
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
const handleSave = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    console.log("User updated:", data);
     if (data.message === "Invalid Token") {
      localStorage.removeItem("token");
      navigate("/login"); 
    } else {
    if (res.ok && data.user) {
      setUser(data.user); 
      setIsEditing(false);
    } else {
      console.error("Update failed:", data.message);
    }
  }
  } catch (err) {
    console.error("Error saving user", err);
  }
};


  return (
    <div className="overflow-auto flex flex-col md:flex-row justify-center items-start gap-6 p-4 md:p-6 w-full">
      {/* Left Sidebar */}
      <div className="w-full md:w-80 bg-gray-100 shadow-md rounded-xl p-6 flex flex-col items-center">
        <img src={img2} alt="user" className="w-20 h-20 rounded-full mb-3" />
        <h3 className="text-lg font-semibold">{user?.name || "Your name"}</h3>
        <p className="text-gray-500 text-sm text-center break-all">
          {user?.email || "yourname@gmail.com"}
        </p>

        <div className="mt-6 w-full flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              activeTab === "profile" ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
          >
            👤 My Profile
          </button>

          <button
            onClick={() => setActiveTab("appointment")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              activeTab === "appointment" ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
          >
            📅 Appointment
          </button>

           <button
            onClick={() => setActiveTab("doctorAppointment")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              activeTab === "doctorAppointment" ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
          >
            📅  Doctor Appointment
          </button>

          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              activeTab === "notifications" ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
          >
            🔔 Notifications
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-md"
          >
            🚪 Log Out
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full md:w-[50%] bg-gray-100 shadow-md rounded-xl p-6 overflow-x-auto">
        {activeTab === "profile" && (
          <>
            {/* --- Profile Details --- */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <img src={img2} alt="user" className="w-16 h-16 rounded-full mx-auto sm:mx-0" />
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold">{user?.name || "Your name"}</h3>
                <p className="text-gray-500">{user?.email || "yourname@gmail.com"}</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div className="flex justify-between flex-col sm:flex-row border-b pb-2">
                <span className="font-medium">Name</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full sm:w-auto"
                  />
                ) : (
                  <span>{user?.name || "Your name"}</span>
                )}
              </div>

              {/* Email */}
              <div className="flex justify-between flex-col sm:flex-row border-b pb-2">
                <span className="font-medium">Email account</span>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full sm:w-auto break-all"
                  />
                ) : (
                  <span className="break-all">{user?.email || "yourname@gmail.com"}</span>
                )}
              </div>

              {/* Location */}
              <div className="flex justify-between flex-col sm:flex-row border-b pb-2">
                <span className="font-medium">Location</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="state"
                    value={user.state}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full sm:w-auto"
                  />
                ) : (
                  <span>{user?.state || "USA"}</span>
                )}
              </div>
            </div>

         
            <div className="mt-6 flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </>
        )}

        {activeTab === "appointment" && (
          <>
         <Appointment/>
         </>
        )}
{activeTab === "doctorAppointment" && (
    <div className="overflow-x-auto">  {/* 👈 yaha wrapper */}
      <DoctorAppointmentHistory/>
    </div>
  )}


        {activeTab === "notifications" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <p className="text-gray-500">All your latest notifications will appear here.</p>
            {/* TODO: notifications list render */}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
