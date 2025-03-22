import React from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AddVendor from './pages/Admin/AddVendor';
import VendorsList from './pages/Admin/VendorsList';
import { VendorContext } from './context/VendorContext';
import VendorAppointments from './pages/Vendor/VendorAppointments';
import VendorDashboard from './pages/Vendor/VendorDashboard';
import VendorProfile from './pages/Vendor/VendorProfile';
import Header from './components/Header';
import { assets } from './assets/assets';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(VendorContext);

  return aToken || dToken ? (
    <div className="relative min-h-screen">
   <div className="absolute inset-0 -z-10 opacity-80">
  <img src={assets.bg2} alt="Background" className="w-full h-full object-cover" />
</div>

      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
    
          <Route path='/add-vendor' element={<AddVendor />} />
          <Route path='/subvendor-list' element={<VendorsList />} />
       
          <Route path='/subvendor-dashboard' element={<VendorDashboard />} />
          <Route path='/subvendor-appointments' element={<VendorAppointments />} />
          <Route path='/subvendor-profile' element={<VendorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (

    <div> 
      <Login />
      <ToastContainer />
    </div>
  );
}

export default App;
