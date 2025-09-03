import { useState } from "react";
import Swal from "sweetalert2";
export default function LabsLogin(){
 const [data,setData]=useState({
  email:"",
  password:""
 })
  const handleOnChange=(e)=>{
   setData({...data,[e.target.name]:e.target.value});
  }
  const handleLogin=()=>{
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/labsLogin`,{
      method:"POST",
      headers:{
       "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    }).then(res=>res.json()).then(data=>{
      if(data.message==="Login Successful"){
        localStorage.setItem("labToken",data.token);
        console.log(data.token);
        Swal.fire({
          title: "Success!",
          text: "Login Successful",
          icon: "success",
          confirmButtonText: "Ok"
        }).then(() => { 
          window.location.href = "/labsDashboard";
        });
       
      }else{
        Swal.fire({
          title: "Error!",
          text: data.message,
          icon: "error",
          confirmButtonText: "Ok"
        });
        
      }
    }).catch(err=>console.log(err))
  }
  return(
    
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4 py-6 sm:py-10">
        <div className="w-full max-w-xl max-h-[90vh] bg-white rounded-2xl shadow-lg p-6 sm:p-8  overflow-y-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Lab Login
        </h1>
        
        <div className="grid grid-cols-1  gap-4">
         
        
          <input
            name="email"
            type="email"
            onChange={handleOnChange}
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
          />
          <input
            name="password"
            type="password"
            onChange={handleOnChange}
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
          />
         
        
          </div>
           <div className="flex justify-center">
          <button
            onClick={handleLogin}
            className="mt-6 w-[60%] sm:w-[40%] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Login
          </button>
        </div>

        <p className="text-center text-gray-600 mt-4">
          Don't  have an account?{" "}
          <a href="/labsRegister" className="text-blue-500 hover:underline">
           Register
          </a>
        </p>
        </div>
     </div>
  )
}