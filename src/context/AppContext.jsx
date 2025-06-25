import { createContext, use } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import { doctors } from "../assets/assets";

import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  // const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [userData, setUserData] = useState(false);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error("Failed to fetch doctors data. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to fetch doctors data. Please try again later.");
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.user);
        console.log("✅ User data loaded:", data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      toast.error("Failed to load user data. Please try again later.");
    }
  };

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
