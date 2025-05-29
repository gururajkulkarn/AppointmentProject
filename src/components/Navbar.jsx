import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
const Navbar = () => {


const navigate = useNavigate();
const[showMenu, setShowMenu] = useState(false)
const[token, setToken] = useState(true)

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
<img className='w-44 cursor-pointer' src={assets.logo} alt=""  />
<ul className='hidden md:flex items-start gap-5 font-medium'>
    <NavLink to='/'>
        <li className='py-1'>HOME</li>
        <hr/>
    </NavLink>
    <NavLink to="./doctors">
        <li className='py-1'>ALL DOCTORS</li>
        <hr/>
    </NavLink>
    <NavLink to="./about">
        <li className='py-1'>ABOUT</li>
        <hr/>
    </NavLink>
    <NavLink to='./contact'>
        <li className='py-1'>CONTACT</li>
        <hr/>
    </NavLink>
</ul>


<div className="flex items-center gap-4">
  {token ? (
    <div className="flex items-center gap-2 cursor-pointer group relative">
      <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
      <img className="w-2.5" src={assets.dropdown_icon} alt="" />

      {/* Dropdown Menu */}
      <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block bg-white shadow-md rounded-lg p-2">
        <p onClick={()=>navigate('my-profile')} className="py-1 px-2 hover:bg-gray-100 cursor-pointer">My Profile</p>
        <p onClick={()=>navigate('my-appointment')} className="py-1 px-2 hover:bg-gray-100 cursor-pointer">My Appointments</p>
        <p onClick={()=>setToken(false)} className="py-1 px-2 hover:bg-gray-100 cursor-pointer">Logout</p>
      </div>
    </div>
  ) : (
    <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Create Account</button>
  )}
</div>

    </div>
  )
}

export default Navbar