import { Link } from "react-router-dom";

const DoctorNavbar = ({ onLogout }) => {
  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center px-6 py-3">
      {/* Logo */}
      <div className="text-xl font-bold">DoctorZ</div>

      {/* Links */}
      <ul className="flex space-x-6">
        <li>
          <Link to="/doctor/dashboard" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/doctor/profile" className="hover:underline">
            Profile
          </Link>
        </li>
        <li>
          <button
            onClick={onLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default DoctorNavbar;
