// LabNavbar.jsx
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UserRound,
  Bell,
  CreditCard,
  UserCircle2,
  LogOut,
  Home,
} from "lucide-react";

export default function LabNavbar() {
  const location = useLocation();

  // ✅ Token se lab details nikalna
  const token = localStorage.getItem("labToken");
  let lab = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      lab = payload?.lab || null;
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("labToken");
    window.location.href = "/home";
  };

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: LayoutDashboard, label: "Dashboard", path: "/labsDashboard" },
    { icon: UserRound, label: "Patients", path: "/labsDashboard/patients" },
    { icon: Bell, label: "Notifications", path: "/labsDashboard/notifications" },
    { icon: CreditCard, label: "Payments", path: "/labsDashboard/payments" },
    { icon: UserCircle2, label: "Profile", path: "/labsDashboard/labProfile" },
  ];

  return (
    <nav className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left: Lab Name */}
        <div className="flex flex-col">
          <span className="text-lg font-bold">{lab?.name || "Lab Panel"}</span>
          <span className="text-sm text-blue-200">{lab?.city || ""}</span>
        </div>

        {/* Center: Nav Links */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`flex items-center gap-1 text-sm font-medium transition ${
                location.pathname === item.path
                  ? "text-yellow-300"
                  : "hover:text-yellow-200"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm font-medium hover:text-red-300 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
}
