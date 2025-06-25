import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext); 
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // NEW

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token'); // Clear token from local storage
    navigate('/'); // Redirect to home page
  }

  useEffect(() => {
  if (token) {
    navigate('/'); // Redirect to home if logged in
  }
},[token])


  return (
    <div className="relative">
      <div className="flex items-center justify-between text-sm py-4 px-4 mb-5 border-b border-b-gray-400">
        <img
          className="w-44 cursor-pointer"
          src={assets.logo}
          alt="Logo"
          onClick={() => navigate('/')}
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-start gap-5 font-medium">
          <NavLink to="/">
            <li className="py-1">HOME</li>
          </NavLink>
          <NavLink to="/doctors">
            <li className="py-1">ALL DOCTORS</li>
          </NavLink>
          <NavLink to="/about">
            <li className="py-1">ABOUT</li>
          </NavLink>
          <NavLink to="/contact">
            <li className="py-1">CONTACT</li>
          </NavLink>
        </ul>

        {/* Hamburger Icon */}
        <div className="md:hidden cursor-pointer" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <img src={assets.menu_icon} alt="menu" className="w-6" />
        </div>

        {/* Profile / Auth Section */}
        <div className="hidden md:flex items-center gap-4 relative">
          {token ? (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setShowProfileDropdown(true)}
              onMouseLeave={() => setShowProfileDropdown(true)}
            >
              <img
              className="w-8 rounded-full"
              src={userData?.image || assets.profile_pic}
              alt="profile"
            />
              <img className="w-2.5" src={assets.dropdown_icon} alt="dropdown" />

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute top-12 right-0 text-base font-medium text-gray-600 z-20 bg-white shadow-md rounded-lg p-2 w-40">
                  <p
                    onClick={() => {
                      navigate('my-profile');
                      setShowProfileDropdown(false);
                    }}
                    className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      navigate('my-appointment');
                      setShowProfileDropdown(false);
                    }}
                    className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={logout}
                    className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
          <NavLink to="/login"><button className="px-4 py-2 bg-blue-600 text-white rounded-md  cursor-pointer">Create Account</button></NavLink>   
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-md absolute top-full left-0 w-full z-20 py-4 px-6 space-y-4">
          <NavLink to="/" onClick={() => setShowMobileMenu(false)} className="block py-1">
            HOME
          </NavLink>
          <NavLink to="/doctors" onClick={() => setShowMobileMenu(false)} className="block py-1">
            ALL DOCTORS
          </NavLink>
          <NavLink to="/about" onClick={() => setShowMobileMenu(false)} className="block py-1">
            ABOUT
          </NavLink>
          <NavLink to="/contact" onClick={() => setShowMobileMenu(false)} className="block py-1">
            CONTACT
          </NavLink>

          <div className="border-t pt-4">
            {token ? (
              <>
                <NavLink to="my-profile" onClick={() => setShowMobileMenu(false)} className="block py-1 cursor-pointer">
                  My Profile
                </NavLink>
                <NavLink to="my-appointment" onClick={() => setShowMobileMenu(false)} className="block py-1 cursor-pointer">
                  My Appointments
                </NavLink>
                <p
                  onClick={() => {
                    setToken(false);
                    setShowMobileMenu(false);
                  }}
                  className="py-1 cursor-pointer"
                >
                  Logout
                </p>
              </>
            ) : (
            <NavLink to="/login"> <button className="w-full py-2 bg-blue-600 text-white rounded-md  cursor-pointer">Create Account</button></NavLink> 
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
