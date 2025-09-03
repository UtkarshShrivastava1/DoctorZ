import { useEffect, useState } from "react";
import { Mail, AlarmClock, MapPin, Search } from "lucide-react";
import Swal from "sweetalert2";
export default function AllLabs() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  let decodedUser = null;

  if (token) {
    try {
      const payload = token.split(".")[1];
      decodedUser = JSON.parse(atob(payload));
    } catch (err) {
      console.error("Invalid token", err);
    }
  }
  console.log("Decoded user:", decodedUser);
  const id = decodedUser?._id?.toString();

  const handleBooking = (labId, userId, testName) => {


     if (!decodedUser) {
    Swal.fire({
      title: "Login Required",
      text: "Please login to book a test.",
      icon: "warning",
      confirmButtonText: "Login",
    }).then(() => {
      window.location.href = "/userLogin"; // redirect to login page
    });
    return;
  }
    fetch(`${import.meta.env.VITE_API_URL}/api/labs/testBooking`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
        Authorization:`Bearer ${token}`

       },
      body: JSON.stringify({ labId, userId, testName }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Booking done Successfully") {
          Swal.fire({
            title: "Success!",
            text: "Booking done Successfully",
            icon: "success",
            confirmButtonText: "Ok"
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Booking Failed",
            icon: "error",
            confirmButtonText: "Ok"
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const fetchLabs = (searchQuery) => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/labs/search?query=${encodeURIComponent(searchQuery)}`,{
      headers:{
        "Content-Type":"application/json",
        // Authorization:`Bearer ${token}`
      }
    })
      .then(res => {
        console.log("Response status:", res.status);
        if (res.status === 401 || res.status === 403) {
        // Token invalid → redirect to login or show message
        Swal.fire({
          title: "Error!",
          text: "Session expired. Please login again.",
          icon: "error",
          confirmButtonText: "Ok"
        }).then(() => { 
          window.location.href = "/userLogin";
        });
       
        return;
      }
        
       return res.json()})
      .then((result) => {
        setData(result.labs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching search results:", err);
        setData([]);
        setLoading(false);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchLabs(query);
    }
  };

  useEffect(() => {
    fetchLabs("");
  }, []);

  // Filter labs to only those having matching tests
  const filteredLabs = data
    .map((lab) => {
      const filteredTests = lab.tests.filter((t) =>
        query
          .toLowerCase()
          .split(" ")
          .every((word) =>
            lab.name.toLowerCase().includes(word) ||
            lab.city.toLowerCase().includes(word) ||
            t.name.toLowerCase().includes(word)
          )
      );
      if (filteredTests.length === 0) return null;
      return { ...lab, tests: filteredTests };
    })
    .filter(Boolean); // remove nulls

  return (
    <div className="w-full ">
      <div className="my-8 w-[50%] rounded-full bg-white p-2 shadow-lg flex items-center gap-3">
        <Search className="w-6 h-6 text-gray-400 ml-2 cursor-pointer" onClick={() => fetchLabs(query)} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Labs, City, or Test"
          onKeyDown={handleKeyDown}
          className="w-full p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-700"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-400 mt-10 text-lg font-medium">Loading...</p>
      ) : filteredLabs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredLabs.map((lab, i) => (
            <div key={i} className="bg-gray-800 p-6 border border-gray-700 rounded-lg shadow-lg flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-100">{lab.name}</h2>
                 <p className="text-gray-400 text-sm">
                  <MapPin className="inline-block w-4 mr-2" />
                  {lab.city}
                </p>
                <p className="text-gray-400 text-sm">
                  <Mail className="inline-block w-4 mr-2" />
                  {lab.email}
                </p>
                <p className="text-gray-400 text-sm">
                  <AlarmClock className="inline-block w-4 mr-2" />
                  {lab.timings.open} - {lab.timings.close}
                </p>

                <h3 className="mt-4 mb-2 text-lg font-semibold text-gray-200">
                  Available Tests
                </h3>
                <ul className="flex flex-col gap-2">
                  {lab.tests.map((t, idx) => (
                    <li key={idx} className="flex justify-between items-center bg-gray-700 p-2 rounded-md">
                      <span className="text-gray-100">{t.name} - ₹{t.price}</span>
                      <button 
                        onClick={() => handleBooking(lab._id, id, t.name)}
                        className="px-3 py-1 bg-indigo-500 text-white rounded-md font-semibold hover:bg-indigo-600 transition"
                      >
                        Book Now
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-10 text-lg font-medium">No labs available</p>
      )}
    </div>
  );
}
