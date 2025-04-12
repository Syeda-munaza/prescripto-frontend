import React from "react";
import { doctors } from "../assets/assets_frontend/assets";

const MyAppointments = () => {
  console.log(doctors);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <p className="pb-3 mt-12 font-medium text-zinc-700 border-b text-lg sm:text-xl">
          My Appointments
        </p>
        <div className="mt-4">
          {doctors.slice(0, 3).map((item, index) => (
            <div
              className="grid grid-cols-1 sm:flex sm:gap-6 py-4 border-b items-center"
              key={index}
            >
              <div className="flex justify-center sm:justify-start">
                <img
                  className="w-24 h-24 sm:w-32 sm:h-32 bg-indigo-50 rounded object-cover"
                  src={item.image}
                  alt=""
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600 text-center sm:text-left">
                <p className="text-neutral-800 font-semibold text-base sm:text-lg">
                  {item.name}
                </p>
                <p>{item.speciality}</p>
                <p className="text-zinc-700 font-medium mt-2">Address:</p>
                <p className="text-xs">{item.address.line1}</p>
                <p className="text-xs">{item.address.line2}</p>
                <p className="text-xs mt-2">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:
                  </span>{" "}
                  25, July, 2024 | 8:30 PM
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-center sm:justify-end mt-4 sm:mt-0">
                <button className="text-sm text-stone-500 text-center py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                  Pay Online
                </button>
                <button className="text-sm text-stone-500 text-center py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyAppointments;
