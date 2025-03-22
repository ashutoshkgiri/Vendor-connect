import express from "express";
import { addVendor, adminLogin, allVendors, appointmentsAdmin, appointmentCancel, adminDashboard, countVehicles } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailable } from "../controllers/VendorController.js";

const adminRouter = express.Router();

adminRouter.post('/add-vendor', authAdmin, upload.single('image'), addVendor);
adminRouter.post('/login', adminLogin);
adminRouter.get('/all-vendors', authAdmin, allVendors);
adminRouter.post('/change-status', authAdmin, changeAvailable);
adminRouter.get('/appointments', authAdmin, appointmentsAdmin);
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel);
adminRouter.get('/dashboard', authAdmin, adminDashboard);
adminRouter.get('/count', authAdmin, countVehicles);

export default adminRouter;
