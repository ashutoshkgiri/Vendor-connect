import React from 'react'
import { useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useContext } from 'react'
import { useEffect } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';

const Dashboard = () => { 
  const {dashData,getDashData,cancelAppointment,aToken}=useContext(AdminContext)
  const [vehicleCount, setVehicleCount] = useState(0);

  useEffect(() => {
    const fetchVehicleCount = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/admin/count",{headers: { aToken }});
        console.log("Vehicle Count:", response.data);
        if (response.data.success){
          setVehicleCount(response.data.count);
        }
      } catch (error) {
        console.error("Error fetching vehicle count:", error);
      }
    };

    fetchVehicleCount();
  }, []);




useEffect(()=>{
  if(aToken){
    getDashData();
  }
},[aToken])
  return dashData && ( 
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>
            
            <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
              <img className='w-30' src={assets.svendor} alt="" />

              <div>
                <p>{dashData.doctors}</p>
                <p>Sub Vendor</p>
              </div>
            </div>
            <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded boarder-2 boarder-gray-100 cursor-pointer hover:scale-105 transition-all'>
              <img className='w-30' src={assets.mvehicle} alt="" />

              <div>
                <p>{vehicleCount}</p>
                <p>Vehicle</p>
              </div>
            </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>All Vehicle</p>

        </div>

        <div className='pt-4 border border-t-0'> 

          {
            dashData.latestAppointment.map((item,index)=>(
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                
                <img className='rounded-full w-10' src={item.docData.image} alt="" />
                <div>
                  <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                  <p className='text-gray-600'>{item.slotDate}</p>
                </div>
            {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              : item.isCompleted ? <p className='text-green-400 text-xs font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
             
              </div>
            ))
          }

        </div>

      </div>
       
    </div>
  )
}

export default Dashboard