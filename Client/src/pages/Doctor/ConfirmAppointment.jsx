import React,{useState,useEffect} from "react";
import axios from "axios";

function ConfirmAppointment(){

    const [appointments, setAppointments] = useState([]);
    
   


    // get Appointments from user by doctor
    useEffect(()=>{
        const fetchAppointments = async()=>{
            try{
                 const token = localStorage.getItem("doctorToken");
                 console.log("Using token:", token);
let decodedDoctor = null;
                 
  if (token) {
    try {
      const payload = token.split(".")[1];
      decodedDoctor = JSON.parse(atob(payload));
      console.log(decodedDoctor);
    } catch (err) {
      console.error("Invalid token", err);
    }
  }
  const id = decodedDoctor.id;
  console.log("id:",id);
  
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/appointments/doctor/getappointment/${id}`,{
                    // headers:{
                    //     Authorization:`Bearer ${token}`
                    // }
                });
                setAppointments(res.data);
            }
            catch(error){
                console.log("Error fetching appointments:",error);
            }
        };
        fetchAppointments();
    },[]);
    

    // update status of appointment
    const updateStatus = async(id,status)=>{
        try{
            const token = localStorage.getItem("doctorToken");
            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/appointments/${id}/status`,{status}
                ,{headers:{Authorization : `Bearer ${token}`}}
            );

            setAppointments(prev=> 
                prev.map(app=>app._id === id ?res.data.appointment:app)

            );

        }
        catch(error){
            console.log("Error updating status:",error);

        }
    }

    return(

// <div className="mt-10">
//                     <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center">Appointments</h3>
//                     {appointments.length === 0 ? (
//                         <p>No appointment requests yet.</p>
                        
//                     ) : (
//                         <table className="w-full border border-gray-300 ">
//                             <thead>
//                                 <tr className="bg-gray-200">
//                                     <th className="border p-2">Patient</th>
//                                     <th className="border p-2">Date</th>
//                                     <th className="border p-2">Status</th>
//                                     <th className="border p-2">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {appointments.map((appt) => (
//                                     <tr key={appt._id}>
//                                         <td className="border p-2">{appt.patientName}</td>
//                                         <td className="border p-2">{appt.date}</td>
//                                         <td className="border p-2">{appt.status}</td>
//                                         <td className="border p-2">
//                                             {appt.status === "Pending" && (
//                                                 <>
//                                                     <button 
//                                                         onClick={() => updateStatus(appt._id,"Confirmed")}
//                                                         className="bg-green-600 text-white px-3 py-1 rounded mr-2"
//                                                     >
//                                                         Confirm
//                                                     </button>
//                                                     <button 
//                                                         onClick={() => updateStatus(appt._id,"Cancelled")}
//                                                         className="bg-red-600 text-white px-3 py-1 rounded"
//                                                     >
//                                                         Cancel
//                                                     </button>
//                                                 </>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     )}
//                 </div>

<div className="mt-10">
  <h3 className="text-2xl font-bold text-blue-600 mb-6 text-center">
    Appointments
  </h3>

  {appointments.length === 0 ? (
    <p className="text-gray-500 text-center italic">
      No appointment requests yet.
    </p>
  ) : (
    <div className="  rounded-lg  justify-between flex flex-col items-center  text-center">
      <table className="  w-160 text-left  justify-between items-center border  ">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-sky-400 text-white">
            <th className="p-3 border-r">Patient</th>
            <th className="p-3 border-r">Date</th>
            <th className="p-3 border-r">Status</th>
            <th className="p-3 border-r">Actions</th>
           
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt, idx) => (
            <tr
              key={appt._id}
              className={`${
                idx % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition border ` }
            >
              <td className="p-3 font-medium text-gray-800 border-r">
                {appt.patientName}
              </td>
              <td className="p-3 text-gray-600 border-r">{appt.date}</td>
              <td className="p-3 border-r">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    appt.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : appt.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {appt.status}
                </span>
              </td>
              <td className="p-3">
                {appt.status === "Pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(appt._id, "Confirmed")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg shadow"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateStatus(appt._id, "Cancelled")}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg shadow"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

        
                )}

                export default ConfirmAppointment;
