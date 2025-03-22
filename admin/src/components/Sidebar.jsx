import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { VendorContext } from '../context/VendorContext'

const Sidebar = () => {
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(VendorContext)
  
    return (
      <div className='min-h-screen bg-white border-r relative'>

        {
          aToken && <ul className='text-[#515151] mt-5 relative z-10'>
            <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/admin-dashboard'}>
              <img src={assets.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>
            <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to='/add-vendor'>
              <img src={assets.add_icon} alt="" />
              <p>Add Vendors</p>
            </NavLink>
            <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/subvendor-list'}>
              <img src={assets.people_icon} alt="" />
              <p>Vendor List</p>
            </NavLink>
          </ul>
        }
        {
          dToken && <ul className='text-[#515151] mt-5 relative z-10'>
            <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/subvendor-dashboard'}>
              <img src={assets.home_icon} alt="" />
              <p className='hidden md:block'>Dashboard SubVendor</p>
            </NavLink>
            <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/subvendor-appointments'}>
              <img src={assets.car} alt="" className="w-10 h-10"/>
              <p className='hidden md:block '>Add Vehicle</p>
            </NavLink>
            <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/subvendor-profile'}>
              <img src={assets.people_icon} alt="" />
              <p className='hidden md:block'>Profile</p>
            </NavLink>
          </ul>
        }
      </div>
    )
}

export default Sidebar;
