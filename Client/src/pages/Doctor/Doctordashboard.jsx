import React,{useState,useEffect} from "react";
import axios from "axios";
// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import doctorimg from "../../assets/doctorimg.jpg";

function Doctordashboard(){

    const [doctor,setDoctor] = useState({});
    const[isEditing,setIsEditing] = useState(false);
    const[formData,setFormData] = useState({});
    // const {id}= useParams();
    const token = localStorage.getItem("doctorToken");
    console.log(token);


    useEffect(()=>{
        const fetchDoctor = async()=>{
            try{
                const token = localStorage.getItem("doctorToken");
                console.log("Using token:", token);
              

                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/doctors/profile`,{
                    headers:{
                        Authorization:`Bearer ${token}`}

                });
                setDoctor(res.data);
                console.log(res.data);
            }
            catch(error){
                console.log("Error fetching doctor profile:",error);
            }
        };
        fetchDoctor();
    },[]);


    //handle input changes in form
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    //Delete profile function
    const handleDeleteProfile = async(e)=>{
        e.preventDefault();
        try{
            console.log("Sending Data",formData);
            const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/doctors/delete/${doctor._id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });
            
            alert("Profile Deleted Successfully");
            localStorage.removeItem("doctorToken");
            window.location.href = "/";
        }
        catch(error){
            console.log("Error updating profile:",error);
            alert("Failed to updating profile");
        }
      }

        //Update profile function
    const handleUpdateProfile = async(e)=>{
        e.preventDefault();
        try{
            console.log("Sending Data",formData);
            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/doctors/update/profile`,formData,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });
            setDoctor(res.data.doctor);
            setIsEditing(false);
            alert("Profile Updated Successfully");
        }
        catch(error){
            console.log("Error updating profile:",error);
            alert("Failed to updating profile");
        }

    }

    return (
        <>

        <div className=" w-full min-h-screen flex  flex-col justify-center items-center p-6">
         
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Section - Doctor Image */} 
        <div className="bg-gray-50 flex flex-col justify-center items-center p-8">
          <img
            src={doctorimg}
            alt="Doctor"
            className="w-60 h-60 object-cover rounded-xl shadow-md"
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-700 uppercase">
            {doctor?.name || "Doctor"}
          </h2>
        </div>

        {/* Right Section - Info */}
        <div className="relative bg-gray-900 text-white p-8">
          {/* Fees Badge */}

          {!isEditing && (
            <span className="absolute top-4 right-4 bg-red-500 px-4 py-1 rounded-full font-semibold shadow-lg">
              ₹{doctor?.fees || 500}
            </span>
          )}

          {!isEditing ? (
            <>
              <h3 className="text-2xl font-bold mb-2"> {doctor?.name}</h3>
              <p className="text-sm text-gray-300 mb-4">{doctor?.hospital}</p>

              <h4 className="text-blue-400 font-semibold uppercase text-sm mb-2">
                Speciality
              </h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {doctor?.specialization?.split(",").map((spec, i) => (
                  <span
                    key={i}
                    className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <p className="mb-2">
                <strong>Experience:</strong> {doctor?.experience || "10 Years"}
              </p>
              <p className="mb-2">
                <strong>Contact:</strong> {doctor?.mobile}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {doctor?.email}
              </p>
              <p className="mb-2">
                <strong>Location:</strong> {doctor?.location}

              </p>

              <p className="mb-2"><strong>Consultation fee:</strong> ₹{doctor?.fees}</p>
              <p className="mb-2">
                <strong>Time:</strong> {doctor?.startTime} - {doctor?.endTime}
              </p>

              {/* Buttons */}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() =>{
                    setFormData(doctor);
                     setIsEditing(true)}}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
                >
                  Edit Profile
                </button>
                <Link
                  to="/viewAppointment"
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg"
                >
                  View Appointments
                </Link>

                <button onClick={handleDeleteProfile} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg">
                  Delete Profile

                </button>
              </div>
            </>
          ) : (
            <form
              onSubmit={handleUpdateProfile}
              className="grid grid-cols-1 gap-4 h-150"
            >
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border rounded p-2 text-white"
              />
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border rounded p-2 text-white"
              />
              <input
                type="text"
                name="specialization"
                value={formData.specialization || ""}
                onChange={handleChange}
                placeholder="Specialization "
                className="w-full border rounded p-2 text-white"
              />
              <input
                type="text"
                name="experience"
                value={formData.experience || ""}
                onChange={handleChange}
                placeholder="Experience"
                className="w-full border rounded p-2 text-white"
              />
              <input
                type="text"
                name="mobile"
                value={formData.mobile || ""}
                onChange={handleChange}
                placeholder="Mobile"
                className="w-full border rounded p-2 text-white"
              />
              <input
                type="text"
                name="hospital"
                value={formData.hospital || ""}
                onChange={handleChange}
                placeholder="Hospital"
                className="w-full border rounded p-2 text-white"
              />
              <input
                type="text"
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
                placeholder="Location"
                className="w-full border rounded p-2 text-white"
              />
              <input
                type="number"
                name="fees"
                value={formData.fees || ""}
                onChange={handleChange}
                placeholder="Consultation Fee"
                className="w-full border rounded p-2 text-white"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
    </>
    )
}


export default Doctordashboard;