import React, { useState } from 'react';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: 'Gururaj Kulkarni',
    image: '',
    email: 'gururajkulkarni115@gmail.com',
    phone: '7353563239',
    adress: 'Bidar, India',
    gender: 'Male',
    dob: '1996-12-09',
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleSave = () => {
    // Save logic here if needed
    setIsEdit(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center text-gray-500">
          {userData.image ? (
            <img src={userData.image} alt="Profile" className="object-cover w-full h-full" />
          ) : (
            <span>No Image</span>
          )}
        </div>

        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="text-xl font-semibold border border-gray-300 px-4 py-2 rounded w-full text-center"
          />
        ) : (
          <h1 className="text-2xl font-bold">{userData.name}</h1>
        )}

        <div className="w-full border-t border-gray-300 pt-4 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Contact Information</h2>
            <div className="mt-2 space-y-2">
              <p className="text-gray-600">Email:</p>
              <p className="text-gray-800">{userData.email}</p>

              <p className="text-gray-600">Phone Number:</p>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  className="border border-gray-300 px-3 py-1 rounded w-full"
                />
              ) : (
                <p className="text-gray-800">{userData.phone}</p>
              )}

              <p className="text-gray-600">Address:</p>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.adress}
                  onChange={(e) => setUserData({ ...userData, adress: e.target.value })}
                  className="border border-gray-300 px-3 py-1 rounded w-full"
                />
              ) : (
                <p className="text-gray-800">{userData.adress}</p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <h2 className="text-lg font-semibold">Basic Information</h2>
            <div className="mt-2 space-y-2">
              <p className="text-gray-600">Gender:</p>
              <p className="text-gray-800">{userData.gender}</p>

              <p className="text-gray-600">Date of Birth:</p>
              <p className="text-gray-800">{userData.dob}</p>
            </div>
          </div>

          <div className="pt-6 text-center">
            {isEdit ? (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
