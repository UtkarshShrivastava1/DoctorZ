
 import { FaUserCircle } from "react-icons/fa";
 import {useState,useEffect} from "react";
 import { useNavigate } from "react-router-dom";

function PatientProfile(){

    const [patient, setPatient] = useState("");
    const [loading, setLoading] = useState(true);
    const patientId = localStorage.getItem("patientId");
    const navigate = useNavigate();
    console.log("Patient Id",patientId);

      useEffect(() => {

        if (!patientId) {
      console.error("⚠️ No patientId found in localStorage!");
      setLoading(false);
      return;
    }

      const fetchUser = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${patientId}`); // ✅ corrected
          const data = await res.json();
          console.log("User data",data);
          setPatient(data);
          
        } catch (error) {
          console.error("Error fetching doctor:", error);
        }
        finally{
        setLoading(false);
        }
        };
    
        if(patientId) fetchUser();
    },[patientId]);

    const handleLogout = async()=>{
      navigate("/")
    }

    if(loading) return <p>Loading...</p>
    if (!patient) return <p>No user found.</p>;
    
    return(
      <div className="flex  flex-col justify-center items-center h-screen ">
        <div className="flex flex-col items-center justify-center mt-10 mb-5 bg-gray-200 w-100 h-100  i">
            
            <FaUserCircle className="text-blue-600 text-2xl" />
            <p className="text-center text-white text-sm  md:mb-5  ">
                <span className="text-black cursor-pointer text-xl" >Name:{patient?.name || "Guest User"}</span>
            </p>    
            <p>Email:{patient?.email ||"Guest User"}</p>
            {/* <p>Mobile:{patient?.mobile || "Guest User"}</p>
            <p>Address:{patient?.address || "Guest User"}</p> */}
            <p>Location:{patient?.location?.city || "Guest User"}</p>
            <p>State:{patient?.location?.state || "Guest User"}</p> 
             <p>Pincode:{patient?.location?.pincode ||"Guest User"}</p> 
             

             <button className="bg-blue-600 h-8 w-25 text-xl text-white mt-6.5 rounded-md hover:bg-blue-700 transition" onClick={handleLogout}>Logout</button>
           
        </div>
        </div>
    )
}

export default PatientProfile;