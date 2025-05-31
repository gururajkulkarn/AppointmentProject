import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  // List of specialities for DRY code
  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Browse Through Doctors by Speciality
      </h1>
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Sidebar Filter */}
        <aside className="sm:w-48 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Specialities
          </h2>
          <nav className="flex flex-col gap-3">
            {specialities.map((spec) => (
              <button
                key={spec}
                onClick={() =>
                  speciality === spec
                    ? navigate("/doctors")
                    : navigate(`/doctors/${spec}`)
                }
                className={`text-left text-sm font-medium transition-colors duration-300 rounded px-3 py-2
                  ${
                    speciality === spec
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                  }`}
              >
                {spec}
              </button>
            ))}
          </nav>
        </aside>

        {/* Doctors Grid */}
        <section className="flex-1">
          {filterDoc.length === 0 ? (
            <p className="text-center text-gray-500 mt-20 text-lg">
              No doctors found for this speciality.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filterDoc.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  className="cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-200"
                >
                  <div className="relative h-96 sm:h-40 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                      Available
                    </span>
                  </div>

                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-sm text-blue-600 mt-1">
                      {item.speciality}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Doctors;
