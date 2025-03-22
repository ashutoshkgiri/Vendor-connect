import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { VendorContext } from "../../context/VendorContext";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const { dToken } = useContext(VendorContext);

  useEffect(() => {
    // Fetch vehicles based on the logged-in vendor/doctor (docId)
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/doctor/getVehicle", {
          headers: { dToken },
        });
        console.log("Fetched Vehicles:", response.data);
        if (response.data.success) {
          setVehicles(response.data.vehicles);
        } else {
          console.error("Failed to fetch vehicles:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, [dToken]);

  return (
    <div className="max-w-5xl mx-auto bg-transparent border-2 border-white/10 backdrop-blur-md shadow-md shadow-black/20 text-white min-h-screen py-10 px-4">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Your Vehicles</h2>

      {vehicles.length === 0 ? (
        <p className="text-center text-gray-600">No vehicles available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle._id} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition duration-300">
          
              <img src={vehicle.vehicleImage} alt="Vehicle" className="w-full h-50 object-cover rounded-md mb-4" />

              <h3 className="text-xl font-semibold text-gray-800">{vehicle.model}</h3>
              <p className="text-gray-600">🚗 <strong>Type:</strong> {vehicle.vehicleType}</p>
              <p className="text-gray-600">👥 <strong>Capacity:</strong> {vehicle.capacity} seats</p>
              <p className="text-gray-600">🔢 <strong>Reg. Number:</strong> {vehicle.registrationNumber}</p>

             
              <div className="flex justify-between mt-4">
                <a
                  href={vehicle.insuranceDocument}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 font-medium text-sm"
                >
                  View Insurance 📜
                </a>
                <a
                  href={vehicle.registrationCertificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-700 font-medium text-sm"
                >
                  View Registration 📄
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleList;
