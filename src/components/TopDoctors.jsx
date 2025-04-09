import React from 'react'
import { doctors } from '../assets/assets'

const TopDoctors = () => {
    return (
    <div className='flex flex-col  items-center gap-4 text my-16 text-gray-900 md:mx-10'>

            <h1 className='text-3xl font-nediu'>Top Doctors Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply Browse Doctors</p>
            <div className='w-full  grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer'>
                        <img className='bg-blue-50' src={item.image} alt="" />
                        <div className='p-4'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                        </div>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <p>{item.name}</p>
                            <p>{item.speciality}</p>
                        </div>
                        </div>
            ))}
                    </div>
                    <button>more</button>
       
    </div>
            )
}

            export default TopDoctors