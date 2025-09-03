import { useEffect, useState } from "react";
import Swal from "sweetalert2";
export default function LabProfile() {
  const [labDetails, setLabDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
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
    if (!id) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/labs/getLab/${id}`,{
      headers:{
      
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      }
    })
      .then((res) => 
        {
          if(res.status===401 || res.status===403){
            console.log("Session expired. Redirecting to login...");
            window.location.href="/labsLogin";
          }
          return res.json();
        })
      .then((data) => {
        
        setLabDetails(data.lab);
        setFormData({
          ...data.lab,
          tests: data.lab.tests || [],
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!labDetails) {
    return (
      <div className="p-4 text-center text-gray-400">
        Loading lab details...
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/labs/updateLab/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok && data.message === "Lab Updated Successfully") {
        setLabDetails(data.updatedLab);
        setIsEditing(false);
        Swal.fire({
          title: "Success!",
          text: "Lab Updated Successfully",
          icon: "success",
          confirmButtonText: "Ok"
        });
      } else {
        console.error("Update failed:", data);
        Swal.fire({
          title: "Error!",
          text: "Failed to update lab details",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }
    } catch (error) {
      console.error("Error saving lab details:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while saving",
        icon: "error",
        confirmButtonText: "Ok"
      });
    }
  };

  const deleteLab=async(id)=>{
    console.log("Deleting lab with ID:",id);
    try{
      const res=await fetch(`${import.meta.env.VITE_API_URL}/api/labs/deleteLab/${id}`,{
        method:"DELETE",
        headers:{
        
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      })
      const data=await res.json();
      if(res.ok){
        Swal.fire({
          title: "Success!",
          text: "Lab Deleted Successfully",
          icon: "success",
          confirmButtonText: "Ok"
        }).then(() => {
        window.location.href="/labsLogin";
        }
        )
      }
      else{
        console.error("Delete lab failed:",data);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete lab",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }

    }catch(error){
      console.error("Error deleting lab:",error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while deleting",
        icon: "error",
        confirmButtonText: "Ok"
      });
    }
  }

  return (
    <div className="p-6 w-full max-w-md mx-auto bg-white/10 backdrop-blur-md border border-gray-300 rounded-2xl shadow-lg text-blue-700">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-400">
          {labDetails.name}
        </h2>
        <button
          className="px-3 py-1 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500 transition"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
        <button className="px-3 py-1 bg-red-400 text-white rounded-lg hover:bg-red-500 transition"
          onClick={() => deleteLab(labDetails._id)}>
        
          Delete
          </button>
      </div>

      {/* Lab Info */}
      <div className="space-y-3 text-gray-100">
        <div>
          <span className="font-semibold text-gray-500">Email: </span>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="ml-2 p-1 rounded bg-gray-700 text-white w-full"
            />
          ) : (
            <span className="text-black">{labDetails.email}</span>
          )}
        </div>

        <div>
          <span className="font-semibold text-gray-500">City: </span>
          {isEditing ? (
            <input
              type="text"
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              className="ml-2 p-1 rounded bg-gray-700 text-white w-full"
            />
          ) : (
            <span className="text-black">{labDetails.city}</span>
          )}
        </div>

        <div>
          <span className="font-semibold text-gray-500">State: </span>
          {isEditing ? (
            <input
              type="text"
              name="state"
              value={formData.state || ""}
              onChange={handleChange}
              className="ml-2 p-1 rounded bg-gray-700 text-white w-full"
            />
          ) : (
            <span className="text-black">{labDetails.state}</span>
          )}
        </div>

        <div>
          <span className="font-semibold text-gray-500">Pincode: </span>
          {isEditing ? (
            <input
              type="text"
              name="pincode"
              value={formData.pincode || ""}
              onChange={handleChange}
              className="ml-2 p-1 rounded bg-gray-700 text-white w-full"
            />
          ) : (
            <span className="text-black">{labDetails.pincode}</span>
          )}
        </div>
        <div>
          <span className="font-semibold text-gray-500">Timings: </span>
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.timings?.open || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    timings: { ...prev.timings, open: e.target.value },
                  }))
                }
                placeholder="Opening time (e.g., 9AM)"
                className="p-1 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                value={formData.timings?.close || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    timings: { ...prev.timings, close: e.target.value },
                  }))
                }
                placeholder="Closing time (e.g., 7PM)"
                className="p-1 rounded bg-gray-700 text-white"
              />
            </div>
          ) : (
            <span className="text-black">
              {labDetails.timings?.open} - {labDetails.timings?.close}
            </span>
          )}
        </div>
      </div>

      {/* Tests */}
      <div className="mt-5">
        <h3 className="font-semibold text-indigo-500 mb-2">Available Tests:</h3>
        {isEditing ? (
          <div className="space-y-2">
            {formData.tests?.map((test, index) => (
              <div key={index} className="flex gap-2 items-center">
                {/* Test Name */}
                <input
                  type="text"
                  value={test.name}
                  onChange={(e) => {
                    const updatedTests = [...formData.tests];
                    updatedTests[index].name = e.target.value;
                    setFormData((prev) => ({ ...prev, tests: updatedTests }));
                  }}
                  placeholder="Test Name"
                  className="p-1 rounded bg-gray-700 text-white flex-1"
                />

                {/* Test Price */}
                <input
                  type="number"
                  value={test.price || ""}
                  onChange={(e) => {
                    const updatedTests = [...formData.tests];
                    updatedTests[index].price = e.target.value;
                    setFormData((prev) => ({ ...prev, tests: updatedTests }));
                  }}
                  placeholder="Rs"
                  className="p-1 rounded bg-gray-700 text-white w-24"
                />

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => {
                    const updatedTests = formData.tests.filter(
                      (_, i) => i !== index
                    );
                    setFormData((prev) => ({ ...prev, tests: updatedTests }));
                  }}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                const updatedTests = [
                  ...(formData.tests || []),
                  { name: "", price: "" },
                ];
                setFormData((prev) => ({ ...prev, tests: updatedTests }));
              }}
              className="mt-2 px-3 py-1 bg-green-400 text-white rounded hover:bg-green-500"
            >
              Add Test
            </button>
          </div>
        ) : (
          <ul className="list-disc list-inside space-y-1 text-black">
            {labDetails.tests?.map((test, idx) => (
              <li key={idx}>
                {test.name} - Rs {test.price}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="mt-4 text-right">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500 transition"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
