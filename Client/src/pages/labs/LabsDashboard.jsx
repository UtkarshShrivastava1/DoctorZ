// LabsDashboard.jsx
import { UserRound, CheckCircle } from "lucide-react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";

export default function LabsDashboard() {

 
  return (
    <div className="flex h-screen w-full bg-slate-100 overflow-hidden">
      {/* Sidebar */}
    
      {/* Main Content */}
      <div className="flex-1 flex flex-col m-3">
        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {/* Patients Card */}
          <div className="bg-white shadow-md rounded-xl p-3   flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-2">
              <UserRound size={26} className="text-blue-500" />
              <h2 className="text-xl font-bold text-blue-500">Patients</h2>
            </div>
            <p className="text-3xl font-semibold text-gray-600">600</p>
          </div>

          {/* Completed Tests Card */}
          <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={26} className="text-green-500" />
              <h2 className="text-xl font-bold text-green-500">Completed Tests</h2>
            </div>
            <p className="text-3xl font-semibold text-gray-600">200</p>
          </div>

          {/* Example Extra Card (Optional) */}
          <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-2">
              <UserRound size={26} className="text-purple-500" />
              <h2 className="text-xl font-bold text-purple-500">Pending Tests</h2>
            </div>
            <p className="text-3xl font-semibold text-gray-600">50</p>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto mt-6 bg-white rounded-xl shadow p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}


