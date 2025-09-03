// UserDashboard.jsx
import { Outlet } from "react-router-dom";

import Footer from "../../Components/Footer";


function UserDashboard() {
  return (
    <div className=" mt-24 flex flex-col  w-full bg-gray-100">
      {/* Navbar */}
    
      
    

      {/* Main Content */}
    
        <div className="p-6 flex-grow">
          <Outlet />
        </div>
     

      {/* Footer */}
     
        <Footer />
   
    </div>
  );
}

export default UserDashboard;
