import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-15">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        My Appointments
      </h1>

      <div className="grid gap-6 max-w-5xl mx-auto">
        {doctors.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center"
          >
            {/* Doctor Image */}
            <div className="w-32 h-32 rounded-full overflow-hidden border border-blue-600 hover:bg-blue-600 transition duration-300">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <p className="text-xl font-semibold text-gray-800">{item.name}</p>
              <p className="text-blue-600 font-medium">{item.speciality}</p>
              <div className="text-gray-600">
                <p className="font-medium">Address:</p>
                <p>{item.address}</p>
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Date & Time:</span>{" "}
                25 May 2025 | 8:30 PM
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 md:items-end">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                Pay Online
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
