import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const VendorsList = () => {
  const { doctors, aToken, getAllDoctors, changeDoctorStatus } = useContext(AdminContext);

  useEffect(() => {
    getAllDoctors();
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium text-white">All Vendors</h1>

      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item, index) => (
          <div
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group bg-gray-900 shadow-lg"
            key={index}
          >
       
            <div className="w-full aspect-[4/5] bg-gray-800 flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src={item.image}
                alt=""
              />
            </div>
            <div className="p-4">
              <p className="text-white text-lg font-medium">{item.name}</p>
              <p className="text-gray-300 text-sm">{item.speciality}</p>
              <div className="flex items-center justify-between mt-2 p-2 bg-gray-700 rounded-md">
                <label className="text-white flex items-center gap-2">
                  <input
                    onChange={() => changeDoctorStatus(item._id)}
                    type="checkbox"
                    checked={item.available}
                    className="cursor-pointer accent-indigo-500"
                  />
                  Available
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorsList;
