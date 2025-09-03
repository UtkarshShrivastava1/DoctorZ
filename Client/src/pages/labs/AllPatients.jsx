import { useEffect, useState } from "react";

export default function AllPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("labToken");
  let labId = null;

  if (token) {
    try {
      const payload = token.split(".")[1]; 
      labId = JSON.parse(atob(payload));   
      console.log("Decoded token:", labId);
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  const id = labId?.lab?._id; 
  console.log("Lab ID:", id);

  useEffect(() => {
    if (!id) {
      setError("Lab ID not found in token");
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/labs/getPatients/${id}`,{
      method:"GET",
      headers:{
        
        Authorization:`Bearer ${token}`
      }
    })
      .then(async (res) => {
        if (!res.ok) {
          const errMsg = await res.json().catch(() => ({}));
          throw new Error(errMsg.message || "Failed to fetch patients");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched patients:", data);
        setPatients(data.patients || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching patients:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const updateStatus = async (bookingId, status) => {
    try {
      console.log("Booking ID:", bookingId);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/labs/updateStatus/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update status");

      // frontend state update
    setPatients((prev) =>
  prev.map((p) =>
    p._id.toString() === bookingId ? { ...p, status: data.updatedBooking.status } : p
  )
);


       setSuccessMessage(`Status updated to "${data.updatedBooking.status}"`);
    setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading) return <p>Loading patients...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
return (
  <div>
    {successMessage && (
      <p className="text-green-500 font-bold mb-4">{successMessage}</p>
    )}

    {patients.length === 0 ? (
      <p>No patients found for this lab.</p>
    ) : (
      patients.map((patient) => (
        <div key={patient._id} className="p-4 border-b">
          <p><strong>Name:</strong> {patient.userId?.name}</p>
          <p><strong>Email:</strong> {patient.userId?.email}</p>
          <p><strong>State:</strong> {patient.userId?.state}</p>
          <p><strong>Test:</strong> {patient.testName}</p>
          <p><strong>Status:</strong> {patient.status}</p>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => updateStatus(patient._id, "approved")}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Approve
            </button>
            <button
              onClick={() => updateStatus(patient._id, "cancelled")}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ))
    )}
  </div>
);
}