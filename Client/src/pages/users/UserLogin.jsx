import { useState } from 'react';
import Swal from 'sweetalert2';
function UserLogin() {
  const [loading,setLoading] = useState(false);
  const [data, setData] = useState({
    
    email: "",
    password: "",
    
  });

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleLogin = () => {
    setLoading(true);
  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(resData => {
      console.log("Full Response:", resData); // ✅ Debugging line

      if (resData.message === "User Logged In Successfully" && resData.token) {
        localStorage.setItem("token", resData.token);
        Swal.fire({
          title: "Success!",
          text: "User Logged In Successfully",
          icon: "success",
          confirmButtonText: "Ok"
        }).then(() => { 
          setLoading(false);
          window.location.href = "/userDashboard/labs";
        });
       
       
      } else {
        Swal.fire({
          title: "Error!",
          text: resData.message,
          icon: "error",
          confirmButtonText: "Ok"
        });
        setLoading(false)
      }
    })
    .catch(err => {
      console.error("Login Error:", err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Try again later!",
        icon: "error",
        confirmButtonText: "Ok"
      });
    });
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">Sign In</h1>
        <div className="flex flex-col items-center gap-4">
         
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
            className=" w-full border-b-2 p-2 focus:outline-none focus:border-blue-500"
          />
         
          <button
            onClick={handleLogin}
            className=" w-[50%] mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            {loading?"Signing in..." :"Sign In"}
          </button>
        </div>
        <p className="text-center text-gray-500 mt-4">
          Don't have an account? <a href="/userRegister" className="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;
