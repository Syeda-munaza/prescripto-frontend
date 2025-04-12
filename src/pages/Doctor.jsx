import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doctors, doctorsCategories } from "../assets/assets_frontend/assets";

const Doctor = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const [filteredDoctors, setFilteredDoctors] = React.useState(doctors);
  const [showFilters, setShowFilters] = React.useState(false);
  useEffect(() => {
    if (speciality) {
      setFilteredDoctors(
        doctors.filter((item) => item.speciality === speciality)
      );
    } else {
      setFilteredDoctors(doctors);
    }
  }, [speciality]);
  return (
    <>
      <div className="">
        <p className="text-gray-600">Browse through the doctors specialist.</p>
        <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
          <button
            className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
              showFilters ? "bg-primary text-white" : ""
            }`}
            onClick={() => setShowFilters((prev) => !prev)}
          >
            Filters
          </button>
          <div
            className={`flex flex-col gap-4 text-sm text-gray-600 ${
              showFilters ? "flex" : "hidden sm:flex"
            }`}
          >
            {doctorsCategories.map((category) => (
              <p
                key={category.speciality}
                onClick={() => {
                  category.speciality === speciality
                    ? navigate("/doctors")
                    : navigate(`/doctors/${category.speciality}`);
                }}
                className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                  category.speciality === speciality
                    ? "bg-indigo-100 text-black"
                    : ""
                }`}
              >
                {category.speciality}
              </p>
            ))}
          </div>
          <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
            {filteredDoctors.map((item) => (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
                key={item._id}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              >
                <img
                  src={item.image}
                  className="bg-blue-50"
                  alt={item.speciality}
                />
                <div className="p-4">
                  <div className="flex items-center gap-4 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctor;
