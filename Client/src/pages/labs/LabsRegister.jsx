import { useState } from "react";
import Swal from "sweetalert2";
export default function LabsRegister() {
  const [lab, setLab] = useState({
    name: "",
    email: "",
    password: "",
    state: "",
    city: "",
    pincode: "",
    timings: { open: "", close: "" },
    tests: [],
  });

  const [testName, setTestName] = useState("");
  const [testPrice, setTestPrice] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLab((prev) => ({ ...prev, [name]: value }));
  };

  const addTest = () => {
    if (!testName || !testPrice) {
      alert("Please enter both Test name and Price");
      return;
    }
    setLab((prev) => ({
      ...prev,
      tests: [...prev.tests, { name: testName, price: Number(testPrice) }],
    }));
    setTestName("");
    setTestPrice("");
  };

  const removeTest = (index) => {
    setLab((prev) => ({
      ...prev,
      tests: prev.tests.filter((_, i) => i !== index),
    }));
  };

  const handleRegistration = async () => {

    const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!passwordRegex.test(lab.password)){
      Swal.fire({
        title: "Error!",
        text: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        icon: "error",
        confirmButtonText: "Ok"
      });
     
      return;
    }
    try {
      const pricingObj = {};
      lab.tests.forEach((t) => {
        pricingObj[t.name] = t.price;
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/labsRegister`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...lab, pricing: pricingObj, tests: lab.tests }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Lab Registered Successfully",
          icon: "success",
          confirmButtonText: "Ok"
        }).then(() => { 
          window.location.href = "/labsLogin";
        });
       
        console.log("Lab:", data);
      } else {
        Swal.fire({
          title: "Error!",
          text: data.message || "Error registering lab ",
          icon: "error",
          confirmButtonText: "Ok"
        });
      
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4 py-6 sm:py-10">
      <div className="w-full max-w-xl max-h-[90vh] bg-white rounded-2xl shadow-lg p-6 sm:p-8  overflow-y-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Lab Registration
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            type="text"
            onChange={handleOnChange}
            placeholder="Lab Name"
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
          />
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
            minLength={8}
           
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
          />
          <input
            name="state"
            type="text"
            onChange={handleOnChange}
            placeholder="State"
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
          />
          <input
            name="city"
            type="text"
            onChange={handleOnChange}
            placeholder="City"
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
          />
          <input
            name="pincode"
            type="text"
            onChange={handleOnChange}
            placeholder="Pincode"
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
          />
          <input
            name="open"
            type="text"
            placeholder="Opening Time (e.g. 9 AM)"
            value={lab.timings.open}
            onChange={(e) =>
              setLab((prev) => ({
                ...prev,
                timings: { ...prev.timings, open: e.target.value },
              }))
            }
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
          />
          <input
            name="close"
            type="text"
            placeholder="Closing Time (e.g. 7 PM)"
            value={lab.timings.close}
            onChange={(e) =>
              setLab((prev) => ({
                ...prev,
                timings: { ...prev.timings, close: e.target.value },
              }))
            }
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
          />
        </div>

        {/* Tests Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Add Tests & Pricing
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Test Name"
              className="flex-1 border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
            />
            <input
              type="number"
              value={testPrice}
              onChange={(e) => setTestPrice(e.target.value)}
              placeholder="Price"
              className="w-32 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
            />
            <button
              onClick={addTest}
              className=" w-40 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
            >
              Add
            </button>
          </div>

          {lab.tests.length > 0 && (
            <ul className="border rounded-lg divide-y bg-gray-50">
              {lab.tests.map((t, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center px-3 py-2"
                >
                  <span className="text-gray-700 font-medium">
                    {t.name} - ₹{t.price}
                  </span>
                  <button
                    onClick={() => removeTest(i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ❌ Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleRegistration}
            className="mt-6 w-[60%] sm:w-[40%] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            🚀 Register
          </button>
        </div>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/labsLogin" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
