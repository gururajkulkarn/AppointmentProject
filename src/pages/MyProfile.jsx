import React, { useContext, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  if (!userData) return <div className="text-center mt-10">Loading...</div>;

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("address", userData.address);
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
      {  headers: { token },}
      );

      if (data.success) {
        toast.success("Profile updated successfully!");
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
       
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
      return;
    }
  };

  return (
    userData && (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
        <div className="flex flex-col items-center space-y-4">
          {isEdit ? (
            <label>
              <div>
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                {!image && <img src={image ? "" : assets.upload_icon} /> }
              </div>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                hidden
              />
            </label>
          ) : (
            <img className="w-36 rounded" src={userData.image} alt="Profile" />
          )}
   

          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
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
                    onChange={(e) =>
                      setUserData({ ...userData, phone: e.target.value })
                    }
                    className="border border-gray-300 px-3 py-1 rounded w-full"
                  />
                ) : (
                  <p className="text-gray-800">{userData.phone}</p>
                )}

                <p className="text-gray-600">Address:</p>
                {isEdit ? (
                  <input
                    type="text"
                    value={userData.address}
                    onChange={(e) =>
                      setUserData({ ...userData, address: e.target.value })
                    }
                    className="border border-gray-300 px-3 py-1 rounded w-full"
                  />
                ) : (
                  <p className="text-gray-800">{userData.address}</p>
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
                  onClick={updateUserProfileData}
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
    )
  );
};

export default MyProfile;
