


import { useEffect, useState } from "react";
import axios from "axios";


function PatientBooked() {
  const [appointments, setAppointments] = useState([]);
  
  
  // const patientName = localStorage.getItem("patientName") || "N/A"; 
 

  useEffect(() => {
   // safety check
    //  const token = localStorage.getItem("patientToken");
     

    //  if (!token) return;


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
  console.log("id:",id);
   if (!token) return;
    const fetchAppointments = async () => {
      try{
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/appointments/patient/status/${id}`,{
          // headers:{
          //   Authorization:`Bearer ${token}`
          // },
        });
        if(Array.isArray(res.data)){
          setAppointments(res.data);
        }
        else{
          setAppointments([]);
        }
      }
      catch(err){
        console.log("Error fetching appointments:",err);
        setAppointments([]);
      }
    };
    fetchAppointments();
  },[]);

  return (
   

    <div className="p-6 flex flex-col items-center">
     

      {appointments.length === 0 ? (
        <div className="text-center mt-10 text-red-600 font-semibold">
          No appointments found
        </div>
      ) : (
        appointments.map((app) => (
          <div
            key={app._id}
            className="border-2 border-gray-400 mb-6 rounded-md  overflow-hidden  bg-white "
          >
            <table className="w-full border-collapse text-sm ">
              <tbody>
                <tr className="border-b border-gray-400">
                  <td className="p-2 font-semibold w-1/4">PATIENT NAME</td>
                  <td className="p-2 w-1/4">{app.patientName}</td>
                  
                </tr>
                
                <tr className="border-b border-gray-400">
                  <td className="p-2 font-semibold">DOCTOR</td>
                  <td className="p-2">{app.doctor?.name}</td>
                </tr>


                  <tr className="border-b border-gray-400">
                  <td className="p-2 font-semibold">SPECIALITY</td>
                  <td className="p-2">{app.doctor?.specialization}</td>
                  </tr>

                <tr className="border-b border-gray-400">
                  <td className="p-2 font-semibold">ADDRESS</td>
                  <td className="p-2" colSpan="3">
                    {app.patientAddress || "N/A"}
                  </td>
                  
                </tr>
                <tr className="border-b border-gray-400">
                  <td className="p-2 font-semibold">REASON FOR VISIT</td>
                  <td className="p-2" colSpan="3">
                    {app.notes || "N/A"}
                  </td>
                </tr>

                <tr className="border-b border-gray-400">
                  <td className="p-2 font-semibold w-1/4">DATE</td>
                  <td className="p-2 w-1/4">{app.date}</td>
                 
                </tr>

                <tr>
                  <td className="p-2 font-semibold">STATUS</td>
                  <td className="p-2" colSpan="3">
                    {app.status === "Confirmed" ? (
                      <span className="text-green-600">✅ Confirmed</span>
                    ) : app.status === "Pending" ? (
                      <span className="text-orange-600">⏳ Pending</span>
                    ) : (
                      <span className="text-red-600">❌ Cancelled</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}

export default PatientBooked;

