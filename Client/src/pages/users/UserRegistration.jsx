import { useState } from 'react';
import Swal from 'sweetalert2';
function UserRegistration() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    state: "",
    city: "",
    pincode: ""
  });

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleRegistration = () => {
    console.log("clicked");
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "User Registered Successfully") {
          Swal.fire({
            title: "Success!",
            text: "User Registered Successfully",
            icon: "success",
            confirmButtonText: "Ok"
          }).then(() => { 
            window.location.href = "/userLogin";
          });
      
        } else {
          Swal.fire({
            title: "Error!",
            text: data.message,
            icon: "error",
            confirmButtonText: "Ok"
          });
         
        }
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">Sign Up</h1>
        <div className=" flex flex-col gap-4  items-center ">
          <input
            name="name"
            type="text"
            onChange={handleOnChange}
            placeholder="Name"
            className="w-full border-b-2 p-2 focus:outline-none focus:border-blue-500"
          />
          <input
            name="email"
            type="email"
            onChange={handleOnChange}
            placeholder="Email"
            className=" w-full border-b-2 p-2 focus:outline-none focus:border-blue-500"
          />
          <input
            name="password"
            type="password"
            onChange={handleOnChange}
            placeholder="Password"
            className="w-full border-b-2 p-2 focus:outline-none focus:border-blue-500"
          />
          <input
            name="state"
            type="text"
            onChange={handleOnChange}
            placeholder="State"
            className="w-full border-b-2 p-2 focus:outline-none focus:border-blue-500"
          />
          <input
            name="city"
            type="text"
            onChange={handleOnChange}
            placeholder="City"
            className="w-full border-b-2 p-2 focus:outline-none focus:border-blue-500"
          />
          <input
            name="pincode"
            type="text"
            onChange={handleOnChange}
            placeholder="Pincode"
            className=" w-full border-b-2 p-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleRegistration}
            className="mt-4 w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Sign Up
          </button>
        </div>
        <p className="text-center text-gray-500 mt-4">
          Already have an account? <a href="/userLogin" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default UserRegistration;
