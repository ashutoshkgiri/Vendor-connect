import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import {toast} from 'react-toastify'
import axios from 'axios'
 

const AddVendor = () => {
    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, SetExperience] = useState('1 Year')
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('Cab Service');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('')
    
    const {backendUrl,aToken}=useContext(AdminContext)


    const onSubmitHandler=async (event) => {
        event.preventDefault()

       try {
        if(!docImg){
            return toast.error('Image Not selected')
       }
       const formData=new FormData()

       formData.append('image',docImg)
       formData.append('name',name)
       formData.append('password',password);
       formData.append('experience',experience)
       formData.append('email',email)
       formData.append('fees',Number(fees))
       formData.append('about',about)
       formData.append('speciality',speciality)
       formData.append('degree',degree)
       formData.append('address',JSON.stringify({line1:address1,line2:address2}))

        formData.forEach((value,key)=>{
              console.log(`${key}:${value}`)
        })


        const {data}=await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{aToken}})
        if(data.success){
            toast.success(data.message)
            setDocImg(false)
            setName('')
            setPassword('')
            setEmail('') 
            setAddress1('')
            setAddress2('')
            setDegree('')
            setAbout('')
            setFees('');
        }else{
            toast.error(data.message)

        }

        
       } catch (error) {
        console.log(error.response.data);

        
       }
        
    }

    return (
        <form onSubmit={onSubmitHandler} className="bg-gray-100 min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Sub Vendor</h1>

                <div className="space-y-6">
                    {/* Upload Section */}
                    <div className="flex flex-col items-center">
                        <label htmlFor="doc-img" className="cursor-pointer">
                            <img
                                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                                alt=""
                                className="w-32 h-32 object-cover border-2 border-dashed border-gray-400 rounded-full"
                            />
                        </label>
                        <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                        <p className="text-sm text-gray-500 mt-2 text-center">
                            Upload Vendor <br />
                            picture
                        </p>
                    </div>

                    {/* Doctor Info Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Vendor Name</label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type="text"
                                placeholder="Name"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Vendor Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                placeholder="Email"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Vendor Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                placeholder="Password"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700"> Vendor Experience</label>
                            <select
                                onChange={(e) => SetExperience(e.target.value)}
                                value={experience}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Year</option>
                                <option value="3 Year">3 Year</option>
                                <option value="4 Year">4 Year</option>
                                <option value="5 Year">5 Year</option>
                                <option value="6 Year">6 Year</option>
                                <option value="7 Year">7 Year</option>
                                <option value="8 Year">8 Year</option>
                                <option value="9 Year">9 Year</option>
                                <option value="10 Year">10 Year</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">salary</label>
                            <input
                                onChange={(e) => setFees(e.target.value)}
                                value={fees}
                                type="number"
                                placeholder="Fee"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Additional Info Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Vendor Category</label>
                            <select
                                onChange={(e) => setSpeciality(e.target.value)}
                                value={speciality}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                            <option value="Cab Service">Cab Service</option>
                            <option value="Logistics Provider">Logistics Provider</option>
                            <option value="Fleet Management">Fleet Management</option>
                            <option value="Car Rental">Car Rental</option>
                            <option value="Public Transport">Public Transport</option>
                            <option value="Ride-Sharing">Ride-Sharing</option>

                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Company</label>
                            <input
                                onChange={(e) => setDegree(e.target.value)}
                                value={degree}
                                type="text"
                                placeholder="Company Name" 
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="text-sm font-medium text-gray-700">Address</label>
                            <input
                                onChange={(e) => setAddress1(e.target.value)}
                                value={address1}
                                type="text"
                                placeholder="Address 1"
                                required
                                className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input

                                onChange={(e) => setAddress2(e.target.value)}
                                value={address2}
                                type="text"
                                placeholder="Address 2"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* About Doctor Section */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">About Sub-vendor</label>
                        <textarea
                        onChange={(e)=>setAbout(e.target.value)}
                        value={about}
                            placeholder="Give description about your past work"
                            rows={5}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-right">
                        <button type='submit' className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Add  Vendor
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddVendor;
