// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // ya labToken / doctorToken jo bhi hai

  if (!token) {
    // agar token ni hai toh login pe bhej do
    return <Navigate to="/userLogin" replace />;
  }

  return children;
}

