import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from 'cloudinary';
import vendorModel from '../models/VendorModel.js';
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";  
import vehicleModel from "../models/vehicleModel.js";

const countVehicles = async (req, res) => {
    try {
        const vehicleCount = await vehicleModel.countDocuments();
        return res.status(200).json({ success: true, count: vehicleCount });
    } catch (error) {
        console.error("Error counting vehicles:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const addVendor = async (req, res) => {
    try {
        const { name, email, password, category, experience, about, fee, address } = req.body;
        const imageFile = req.file;

        if (!name || !email || !password || !category || !experience || !about || !fee || !address) {
            return res.status(400).json({ success: false, message: "Missing details" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a stronger password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const vendorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            category,
            experience,
            about,
            fee, 
            address: JSON.parse(address),
            available: true,
            date: Date.now(), 
        };

        const newVendor = new vendorModel(vendorData);
        await newVendor.save();

        res.status(201).json({ success: true, message: "Sub Vendor added successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "Internal server error", error: error.message });
    }
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter email and password" });
        }

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: "Invalid admin credentials" });
        }

        const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '1h' });
        return res.json({ success: true, token });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
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

const adminDashboard = async (req, res) => {
    try {
        const vendorCount = await vendorModel.countDocuments();
        const vehicleCount = await vehicleModel.countDocuments();
        return res.json({ success: true, vendorCount, vehicleCount });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export { addVendor, adminLogin, allVendors, countVehicles, adminDashboard };