import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

const getAvailableSlots = async () => {
  setDocSlots([])

// getting current Date()
let today = new Date()

for(let i = 0; i < 7; i++){
  // getting date with index
  let currentDate = new Date(today)
  currentDate.setDate(today.getDate()+1)

}

// setting end time of the date with index
let endTime = new Date()
endTime.setDate(today.getDate()+1)
endTime.setHours(21,0,0,0)

// setting hours
if(today.getDate() === currentDate.getDate()){
  currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0 )
} else {
  currentDate.setHours(10)
  currentDate.setMinutes(0)
}

let timeSlots = []

while(currentDate < endTime) {
  let formattedTime = currentDate.toLocalTimeString([],{hour: '2-digit', minute: '2-degit'})

  // add slot to Array
  timeSlots.push({
  datetime: new Date(currentDate),
  time: formattedTime
  });

  // increment current time by 30 minutes
  currentDate.setMinutes(currentDate.getMinutes() + 30);

}



}



  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(()=>{
getAvailableSlots();
  },[docInfo])

  return  docInfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="" />
          </div>

          <div className="flex-1 border  border-gray-400 rounded-lg p-8 p-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p>
              {docInfo.name}
              <img src={assets.varified_icon} alt="" />
            </p>
          </div>
          <p>
            {docInfo.degree} - {docInfo.speciality}
          </p>
          <button>{docInfo.experience}</button>

          <div>
            <p>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p>{docInfo.about}</p>
          </div>
        </div>
      </div>
    
  );
};

export default Appointment;
