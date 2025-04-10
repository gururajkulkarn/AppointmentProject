import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {


const navigate = useNavigate();


  return (
    <div style={{backgroundColor:"#8686f3"}} className='flex flex-col md:flex-row  flex-wrap rounded-lg px-6 md:px-10 lg:px-20'>
<div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
    <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
        <p>Book Appointment</p>
        <p className='mt-4'>With 100+ Trusted Doctors</p>
    </div>
    <button onClick={() => navigate('/login')} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3'>Create account</button>
</div>
<div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
    <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
</div>


    </div>
  )
}

export default Banner