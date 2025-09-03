import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import img2 from "../assets/img2.webp"; // default user image

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  const token = localStorage.getItem("token");
  let user = null;
 const labToken = localStorage.getItem("labToken");
  if (token) {
    try {
      const payload = token.split(".")[1];
      user = JSON.parse(atob(payload));
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  const id = user ? user._id : null;

  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_API_URL}/api/auth/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [id]);

  // Left side links
  const leftLinks = [
    { name: "Home", path: "/" },
    { name: "Find Doctors", path: "/doctor/all" },
    { name: "Lab Test", path: "/userDashboard/labs" },
  ];

  return (
    <nav className="w-full fixed bg-blue-500 shadow-md text-black z-50">
      <div className="max-w-7xl mx-auto py-4 px-4 flex items-center justify-between">
        {/* Logo */}
      <div className="text-2xl font-bold tracking-wide">
  <span className="text-3xl text-white">M</span>edi
  <span className="text-3xl text-white">A</span>id
</div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 items-center justify-between ml-10">
          {/* Left side */}
          <div className="flex space-x-8">
            {leftLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-md font-bold transition-all duration-300 ease-in-out ${
                  location.pathname === link.path
                    ? "text-white font-bold"
                    : "text-black"
                } hover:text-white`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white rounded"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex space-x-8 items-center">
            {/* For Doctors & For Labs always visible */}
            <Link
              to="/doctor/login"
              className={`relative text-md font-bold transition-all duration-300 ease-in-out ${
                location.pathname === "/doctor/login"
                  ? "text-white font-bold"
                  : "text-black"
              } hover:text-white`}
            >
              For Doctors
            </Link>

            {/* <Link
              to="/labsRegister"
              className={`relative text-md font-bold transition-all duration-300 ease-in-out ${
                location.pathname === "/lab-login"
                  ? "text-white font-bold"
                  : "text-black"
              } hover:text-white`}
            >
              For Labs
            </Link> */}


            <span
  onClick={() => {
    if (labToken) {
      // Agar lab logged in hai
      window.location.href = "/labsDashboard";
    } else {
      // Agar login nahi hai
      window.location.href = "/labsRegister";
    }
  }}
  className={`cursor-pointer relative text-md font-bold transition-all duration-300 ease-in-out ${
    location.pathname === "/lab-login"
      ? "text-white font-bold"
      : "text-black"
  } hover:text-white`}
>
  For Labs
</span>

            {/* Login / Signup OR Profile */}
            {user ? (
              <Link
                className="flex cursor-pointer items-center gap-3"
                to="/userDashboard/profile"
              >
                <img
                  className="w-10 h-10 rounded-full border"
                  src={img2}
                  alt="user"
                />
                <p className="font-medium text-white">
                  {userData?.name || "Loading..."}
                </p>
              </Link>
            ) : (
              <Link
                to="/userRegister"
                className={`relative text-md font-bold transition-all duration-300 ease-in-out ${
                  location.pathname === "/login"
                    ? "text-white font-bold"
                    : "text-black"
                } hover:text-white`}
              >
                Login / Signup
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="lg:hidden mt-4 space-y-4 px-4 pb-4">
          {/* Left Links */}
          {leftLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 px-3 rounded font-semibold cursor-pointer transition ${
                location.pathname === link.path
                  ? "text-blue-600 bg-white"
                  : "text-red-100"
              } hover:bg-blue-600 hover:text-white`}
            >
              {link.name}
            </Link>
          ))}

          {/* Right Links */}
          <Link
            to="/doctor/login"
            onClick={() => setMenuOpen(false)}
            className="block py-2 px-3 rounded font-semibold hover:bg-blue-600 hover:text-white"
          >
            For Doctors
          </Link>
         


          {/* For Labs (Mobile) */}
<span
  onClick={() => {
    if (labToken) {
      window.location.href = "/labsDashboard";
    } else {
      window.location.href = "/labsRegister";
    }
    setMenuOpen(false);
  }}
  className="block py-2 px-3 rounded font-semibold hover:bg-blue-600 hover:text-white cursor-pointer"
>
  For Labs
</span>


          {/* Login / Signup OR Profile */}
          {user ? (
            <Link
              to="/userDashboard/profile"
              className="flex items-center gap-2 py-2 px-3"
              onClick={() => setMenuOpen(false)}
            >
              <img
                className="w-8 h-8 rounded-full border"
                src={img2}
                alt="user"
              />
              <p className="text-black">{userData?.name}</p>
            </Link>
          ) : (
            <Link
              to="/userRegister"
              onClick={() => setMenuOpen(false)}
              className="block py-2 px-3 rounded font-semibold hover:bg-blue-600 hover:text-white"
            >
              Login / Signup
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
