import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { VendorContext } from "../../context/VendorContext";

const VendorAppointments = () => {
  const { backendUrl, dToken, profileData } = useContext(VendorContext);
  const [vehicleData, setVehicleData] = useState({
    registrationNumber: "",
    model: "",
    capacity: "",
    vehicleType: "",
    insuranceDocument: null,
    registrationCertificate: null,
    vehicleImage: null, // ✅ Added vehicle image field
  });

  const handleChange = (e) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(vehicleData).forEach((key) => {
      formData.append(key, vehicleData[key]);
    });

    // ✅ Automatically attach logged-in doctor's ID (docId)
    formData.append("docId", profileData._id); 

    try {
      const response = await axios.post(
        `${backendUrl}/api/doctor/vehicleadd`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            dToken,
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.data.success) {
        toast.success("Vehicle added successfully!");

        setVehicleData({
          registrationNumber: "",
          model: "",
          capacity: "",
          vehicleType: "",
          insuranceDocument: null,
          registrationCertificate: null,
          vehicleImage: null,
        });
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
      toast.error("Error adding vehicle");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Vehicle Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Registration Number</label>
          <input
            type="text"
            name="registrationNumber"
            placeholder="Enter Registration Number"
            value={vehicleData.registrationNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Vehicle Model</label>
          <input
            type="text"
            name="model"
            placeholder="Enter Vehicle Model"
            value={vehicleData.model}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Seating Capacity</label>
          <input
            type="number"
            name="capacity"
            placeholder="Enter Capacity"
            value={vehicleData.capacity}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
          <select
            name="vehicleType"
            value={vehicleData.vehicleType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Vehicle Type</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Truck">Truck</option>
            <option value="Bus">Bus</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Insurance Document</label>
          <input
            type="file"
            name="insuranceDocument"
            accept=".pdf,.jpg,.png"
            onChange={handleFileChange}
            required
            className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 file:py-2 file:px-4 file:border-none file:bg-blue-500 file:text-white file:rounded-md file:cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Registration Certificate</label>
          <input
            type="file"
            name="registrationCertificate"
            accept=".pdf,.jpg,.png"
            onChange={handleFileChange}
            required
            className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 file:py-2 file:px-4 file:border-none file:bg-blue-500 file:text-white file:rounded-md file:cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Vehicle Image</label>
          <input
            type="file"
            name="vehicleImage"
            accept=".jpg,.png"
            onChange={handleFileChange}
            required
            className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 file:py-2 file:px-4 file:border-none file:bg-blue-500 file:text-white file:rounded-md file:cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit Vehicle Details
        </button>
      </form>
    </div>
  );
};

export default VendorAppointments;
