import React from 'react'
import { AdminContext } from '../context/AdminContext'
import {assets} from '../assets/assets'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { VendorContext } from '../context/VendorContext'


const Navbar = () => {

    const {aToken,setAToken}=useContext(AdminContext);
    const {dToken,setDToken}=useContext(VendorContext);
    const navigate=useNavigate()

    const logout=()=>{
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('');
        dToken && localStorage.removeItem('dToken')

    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
            <img className='w-28 sm:w-30 cursor-pointer' src={assets.admin_logo} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full baorder-gray-500 text-gray-600'>{aToken?'Admin':'Sub-Vendor'}</p>
        </div>
        <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 roudned-full'>Logout</button>

    </div>
  )
}

export default Navbar