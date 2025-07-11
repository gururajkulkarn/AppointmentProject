import React, { useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({speciality, docId}) => {

const { doctors } = useContext(AppContext);
const navigate = useNavigate()

//   currentDate.setMinutes(currentDate.getMinutes() + 30)

const [relDoc, setRelDoc] = useState([])


useEffect(() => {
    if (doctors.length > 0 && speciality ) {
        const doctorsData  = doctors.filter((doc) =>  doc.speciality === speciality && doc._id !== docId) 
    setRelDoc(doctorsData) }

}, [doctors, speciality, docId])

  return (
     <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply Browse Doctors</p>
        
        {/* Responsive Grid Layout */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-3 sm:px-0'>
            {relDoc.slice(0, 5).map((item, index) => (
                <div onClick={()=> {navigate(`/appointment/${item._id}`); scrollTo(0,0)}} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer shadow-md'>
                    <img className='w-full h-40 object-cover bg-blue-50' src={item.image} alt={item.name} />
                    <div className='p-4'>
                        {/* <div className='flex items-center gap-2'>
                            <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                            <p className='text-sm text-green-600'>Available</p>
                        </div> */}
                        <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <p className="text-sm">
                  {item.available ? "Available" : "Not Available"}
                </p>
              </div>

                        <div className='flex flex-col items-center mt-2 text-sm text-center text-gray-700'>
                            <p className='font-semibold'>{item.name}</p>
                            <p className='text-gray-500'>{item.speciality}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    
        {/* More Button */}
        <button style={{ backgroundColor: 'rgba(214,69,52,255)' }} onClick={() => {navigate('/doctors')}} className='mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'>More</button>
    </div>
  )
}

export default RelatedDoctors