import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true, unique: true },
  model: { type: String, required: true },
  capacity: { type: Number, required: true },
  vehicleType: { 
    type: String, 
    required: true, 
    enum: ["Sedan", "SUV", "Truck", "Bus", "Electric"] 
  },
  insuranceDocument: { type: String, required: true },
  registrationCertificate: { type: String, required: true },
  vehicleImage: { type: String, required: true },
  docId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Doctor", 
    required: true 
  },
}, { timestamps: true });

const vehicleModel = mongoose.model("Vehicle", VehicleSchema);

export default vehicleModel;
