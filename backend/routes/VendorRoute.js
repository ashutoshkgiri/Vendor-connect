import express from "express";
import { vendorLogin, addVehicle } from "../controllers/VendorController.js";
import authVendor from "../middlewares/authVendor.js";
import upload from '../middlewares/multer.js';

const vendorRouter = express.Router();

vendorRouter.post('/login', vendorLogin);
vendorRouter.post(
    "/vehicleadd",
    authVendor,
    upload.fields([
        { name: "insuranceDocument" },
        { name: "registrationCertificate" },
        { name: "vehicleImage" }
    ]), 
    addVehicle
);

export default vendorRouter;
