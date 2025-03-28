import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const VendorContext =createContext();


const VendorContextProvider=(props)=>{

    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [dToken,setDToken]=useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'');

    const [appointments,setAppointments]=useState([]);

    const [dashData,setDashData]=useState(false)
    const [profileData,setProfileData]=useState(false)


    const getAppointments=async () => {
            
      try {
 
        const {data}=await axios.get(backendUrl+'/api/doctor/appointments',{headers:{dToken}});
    
        if(data.success){ 
            //console.log(data.appointments)
            setAppointments(data.appointments)
        }else{
            toast.message(data.message)
        } 
          
      } catch (error) {
        console.log('Error:', error.message);
         toast.error(error.message)

        
      } 
        
    }

    const completeAppointment=async (appointmentId) => {

        try{

            const {data}=await axios.post(backendUrl+'/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}});

            //console.log(data);   
            if(data.success){ 
                toast.success(data.message)
                getAppointments()
               
            }else{
                toast.error(data.message)
            } 

        }catch(error){

            console.log('Error:', error.message);
            toast.error(error.message)

        }
        
    }


    const cancelAppointment=async (appointmentId) => {

        try{

            const {data}=await axios.post(backendUrl+'/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}});
    
            if(data.success){ 
                toast.success(data.message)
                getAppointments()
               
            }else{
                toast.error(data.message)
            } 

        }catch(error){

            console.log('Error:', error.message);
            toast.error(error.message)

        }
        
    }

    const getDashData=async () => {

        try {

            const {data}= await axios.get(backendUrl+'/api/doctor/dashboard',{headers:{dToken}});
          

            if(data.success){
               // console.log(data.dashboard)
                setDashData(data.dashboard);
               
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {

            console.log('Error:', error.message);
            toast.error(error.message)
            
        }
        
    }
    const getProfileData=async () => {
         try {

            const {data}=await axios.get(backendUrl+'/api/doctor/profile',{headers:{dToken}})
            

            if(data.success){
                setProfileData(data.profileData)
               // console.log(data.profileData)
            }else{
                toast.error(data.message)
            }
            
         } catch (error) {

            console.log('Error:', error.message);
            toast.error(error.message)
            
            
         }
        
    }
    const value={
        dToken,setDToken,
        backendUrl,
        appointments,
         getAppointments,
         completeAppointment,
         cancelAppointment,
         dashData,
        setDashData,
        getDashData, 
        profileData,
        getProfileData,
        setProfileData

    }

    return (
        <VendorContext.Provider value={value}>
           {props.children}
        </VendorContext.Provider>
    )
}

export default VendorContextProvider;