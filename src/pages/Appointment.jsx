import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol,backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };


const getAvailableSlots = async () => {
  setDocSlots([]);

  let today = new Date();

  for (let i = 0; i < 7; i++) {
    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    let endTime = new Date(today);
    endTime.setDate(today.getDate() + i);
    endTime.setHours(21, 0, 0, 0);

    if (i === 0) {
      currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
    } else {
      currentDate.setHours(10);
      currentDate.setMinutes(0);
    }

    let timeSlots = [];

    while (currentDate < endTime) {
      let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      timeSlots.push({
        datetime: new Date(currentDate),
        time: formattedTime
      });

      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }

    setDocSlots(prev => ([...prev, timeSlots]));
  }
};



const bookAppointment = async () => {
  if (!token) {
    toast.warn("Please login to book an appointment.");
    return navigate('/login');
  }

try{

const date = docSlots[slotIndex][0].datetime
let day = date.getDate();
let month = date.getMonth() + 1; // Months are zero-based in JavaScript
let year = date.getFullYear();
const slotDate = day +"_"+ month + "_" + year;
console.log("Selected Slot Date:", slotDate,slotTime);

const {data} = await axios.post(backendUrl + '/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})
if(data.success){
  toast.success("Appointment booked successfully!");
  getDoctorsData();
  navigate('/my-appointments');
}
else{
  toast.error("Failed to book appointment. Please try again.");
  console.error("Booking failed:", data.message);}
}

catch (error) {
  console.error("Error booking appointment:", error);
  toast.error("Failed to book appointment. Please try again later.");
}

}



  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(()=>{
getAvailableSlots();
  },[docInfo])

// useEffect(() => {
// console.log(docSlots)

// ,[docSlots]}
// )


  return  docInfo && (
   <>
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img className="bg-blue-600 w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="" />
          </div>

          <div className="flex-1 border  border-gray-400 rounded-lg p-10 p-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img src={assets.varified_icon} alt="" />
            </p>
        
          <p className="flex items-center gap-2 text-sm mt-1 text-gray-500">
            {docInfo.degree} - {docInfo.speciality}
          </p>
          <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>

          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-500 mt-3">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
          </div>
          <p className="text-gray-500 font-medium mt-4">Appointment Fees:$<span className="text-gray-600">{currencySymbol}{docInfo.fees}</span></p>
         </div>
        </div>
   </div>



<div className="mt-10 px-4 sm:px-10">
  <p className="font-semibold text-lg text-gray-700 mb-3">Booking Slots</p>
  <div className="flex gap-3 overflow-x-auto scrollbar-hide">
    {
      docSlots.length > 0 && docSlots.map((item, index) => (
        <div
          key={index}
          onClick={() => setSlotIndex(index)}
          className={`min-w-[80px] text-center px-4 py-10 rounded-full cursor-pointer transition 
            ${slotIndex === index ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700'}
          `}
        >
          <p className="font-semibold">{item[0] && daysofWeek[item[0].datetime.getDay()]}</p>
          <p className="text-sm">{item[0] && item[0].datetime.getDate()}</p>
        </div>
      ))
    }
  </div>

<div className="flex items-center gap-3 w-full overflow-x-scroll mt-4 ">
  {docSlots.length  && docSlots[slotIndex].map((item, index) => (
<p key={item.time || index} onClick={()=> setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-600 text-white font-medium' : 'text-gray-400 border border-gray-300 font-medium'}`}>
{item.time.toLowerCase()  }
</p>

  ))}
</div>

<button onClick={bookAppointment} className="bg-blue-600 text-white text-sm font-light px-14 py-3 rounded-full mt-4 text-2xl font-medium cursor-pointer ">Book an Appointment</button>


<RelatedDoctors  docId={docId} speciality={docInfo.speciality}/>

</div>


 
</>
    
  );
};


export default Appointment;
