import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate=useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [idProof, setIdProof] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contact.length < 10) {
      alert("Contact number should be at least 10 digits.");
      return;
    }

    const userData = {
      name,
      age,
      gender,
      contact,
      idProof,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/registerUser/insertUser`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      console.log(data);

      if (data.status === 1) {
        alert("User registered successfully!");
        // navigate("/AppointScheduling")
        setName("");
        setAge("");
        setGender("");
        setContact("");
        setIdProof("");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 sm:py-12">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Register User By Staff
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="fullName"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label
              htmlFor="age"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min={0}
              placeholder="Enter age"
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="contactInfo"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Contact Info
            </label>
            <input
              type="tel"
              id="contactInfo"
              name="contactInfo"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter contact number"
              pattern="[0-9]{10,}"
              title="Please enter at least 10 digits"
            />
          </div>

          <div>
            <label
              htmlFor="idProof"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              ID Proof
            </label>
            <input
              type="text"
              id="idProof"
              name="idProof"
              value={idProof}
              onChange={(e) => setIdProof(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter ID proof details"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition text-base sm:text-lg"
            >
              Register User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
