import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  UserRound,
  Bell,
  CreditCard,
  UserCircle2,
  LogOut,
  Menu,
  X,
  Home,
} from "lucide-react";

function Sidebar() {
  const [open, setOpen] = useState(false);
const token = localStorage.getItem("labToken");
  let labId = null;
  if (token) {
    try {
      const payload = token.split(".")[1];
      labId = JSON.parse(atob(payload));
      console.log("Decoded token:", labId);
    } catch (err) {
      console.error("Invalid token", err);
    }
  }
  console.log("Lab ID:", labId);

  const handleLogout = () => {
    localStorage.removeItem("labToken"); // match login key
    window.location.href = "/home";
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-blue-700 px-4 py-3 text-white">
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 bg-blue-700 shadow-xl transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Top Section */}
        <div className="p-6 text-center border-b border-blue-500 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {labId?.lab?.name}
            </h1>
            <p className="text-slate-200 text-sm mt-1">{labId?.lab?.city}</p>
          </div>
          {/* Cross button only mobile */}
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2 mt-6 px-4">
          {[
            {icon:Home, label: "Home", path: "/"},
            { icon: LayoutDashboard, label: "Dashboard", path: "/labsDashboard" },
            { icon: UserRound, label: "Patients", path: "patients" },
            { icon: Bell, label: "Notifications" },
            { icon: CreditCard, label: "Payments" },
            { icon: UserCircle2, label: "Profile", path: "labProfile" },
          ].map((item, i) => (
            <Link
              to={item.path}
              key={i}
              className="flex items-center text-slate-200 p-3 rounded-lg hover:bg-white hover:text-blue-600 transition"
            >
              <item.icon className="w-5 mr-2" />
              {item.label}
            </Link>
          ))}
        </div>

        {/* Profile / Logout */}
        <div className="mt-2 p-4 border-t border-blue-500 flex flex-col items-center ">
          <button
            onClick={handleLogout}
            className="flex items-center mt-3 text-slate-200 text-sm hover:text-red-400 transition"
          >
            <LogOut className="w-4 mr-1" /> Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
