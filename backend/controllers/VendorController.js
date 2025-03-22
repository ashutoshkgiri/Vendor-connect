import { v2 as cloudinary } from 'cloudinary';
import vendorModel from '../models/VendorModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import vehicleModel from '../models/vehicleModel.js';

const addVehicle = async (req, res) => {
    try {
        const { registrationNumber, model, capacity, vehicleType, vendorId } = req.body;

        if (!req.files || !req.files.insuranceDocument || !req.files.registrationCertificate || !req.files.vehicleImage) {
            return res.status(400).json({ success: false, message: "Please upload all required files" });
        }

        const insuranceUpload = await cloudinary.uploader.upload(req.files.insuranceDocument[0].path);
        const registrationUpload = await cloudinary.uploader.upload(req.files.registrationCertificate[0].path);
        const vehicleImageUpload = await cloudinary.uploader.upload(req.files.vehicleImage[0].path);

        const newVehicle = new vehicleModel({
            registrationNumber,
            model,
            capacity,
            vehicleType,
            insuranceDocument: insuranceUpload.secure_url,
            registrationCertificate: registrationUpload.secure_url,
            vehicleImage: vehicleImageUpload.secure_url,
            vendorId
        });

        await newVehicle.save();
        return res.status(201).json({ success: true, message: "Vehicle added successfully!", vehicle: newVehicle });

    } catch (error) {
        console.error("Error in addVehicle:", error);
        return res.status(500).json({ error: error.message });
    }
};

const vendorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter email and password" });
        }

        const vendorData = await vendorModel.findOne({ email });
        if (!vendorData) {
            return res.json({ success: false, message: "Vendor not found" });
        }

        const check = await bcrypt.compare(password, vendorData.password);
        if (check) {
            const token = jwt.sign({ id: vendorData._id }, process.env.JWT_KEY);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

const allVendors = async (req, res) => {
    try {
        const vendors = await vendorModel.find({}).select('-password');
        res.json({ success: true, vendors });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "Some error occurred" });
    }
};

const changeAvailable = async (req, res) => {
    try {
        const { vendorId } = req.body;
        const vendor = await vendorModel.findById(vendorId);

        if (!vendor) {
            return res.status(404).json({ success: false, message: "Vendor not found" });
        }

        vendor.available = !vendor.available;
        await vendor.save();

        res.json({ success: true, message: "Vendor availability updated", available: vendor.available });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { addVehicle, vendorLogin, allVendors, changeAvailable };
