import react ,{useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";



function DoctorLogin(){

    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        email:"",
        password:"",
    });
    const[error, setError] = useState("");


    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");

        try{
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/doctors/login`,formData);
            localStorage.setItem("doctorToken",res.data.token);
           Swal.fire({
                      title: "Success!",
                      text: " Successful Login",
                      icon: "Success",
                      confirmButtonText: "Ok",
                      customClass: "border-0",
          
                  }).then(()=>{
                      window.location.href = "/doctor/dashboard";
                  })
                navigate('/doctor/dashboard');
        }
       catch (error) {
    console.error("❌ Login Error:", error);

    // agar server se response aaya hai (400, 401, etc.)
    if (error.response) {
        setError(error.response.data.message || "Invalid Credentials");
    } else {
        setError("Something went wrong, please try again.");
    }
}

        
    
    }

    return(
        <div className='flex justify-center items-center min-h-screen bg-gray-200'>
            <div className='bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg'>
                <h2 className="text-2xl font-bold text-center mb-6"> Doctor Login</h2>

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email"  name="email" placeholder='Enter your email' className="w-full px-4 py-2 border rounded-lg" onChange={handleChange}/>
                    <input type="password"  name ="password" placeholder='Enter your password' className="w-full px-4 py-2 border rounded-lg" onChange={handleChange}/>
                    <button type='submit' className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"> Login</button>
                </form>
                <p className="mt-4 text-center"> Don't have an account?{" "} <span className="text-blue-600 cursor-pointer" onClick={()=>navigate('/doctor/register')}>Register Here</span></p>
            </div>
        </div>
    )
}

export default DoctorLogin;