import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { assets, doctors } from "../assets/assets_frontend/assets";
import { ClipLoader } from "react-spinners";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const [docInfo, setDocInfo] = React.useState(null);
  const { docId } = useParams();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  //Date and time states
  const [docSlots, setDocSlots] = React.useState([]);
  const [slotIndex, setSlotIndex] = React.useState(0);
  const [slotTime, setSlotTime] = React.useState("");
  useEffect(() => {
    const fetchDocInfo = async () => {
      const docInfo = doctors.find((doc) => doc._id === docId);
      setDocInfo(docInfo);
    };

    fetchDocInfo();
  }, [docId]);
  useEffect(() => {
    const getAvailableSSlots = async () => {
      setDocSlots([]);
      //getting currentDate
      let today = new Date();
      for (let i = 0; i < 7; i++) {
        //getting date with index
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        //setting end time of the date with index
        let endTime = new Date();
        endTime.setDate(today.getDate() + i);
        endTime.setHours(21, 0, 0, 0);

        //setting hour
        if (today.getDate() === currentDate.getDate()) {
          currentDate.setHours(
            currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
          );
          currentDate.getMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        } else {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }
        let timeSlots = [];

        while (currentDate < endTime) {
          let formattedTime = currentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          //add slot to array
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
          //incrementing time
          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }
        setDocSlots((prev) => [
          ...prev,
          { date: currentDate, timeSlots: timeSlots },
        ]);
      }
    };

    getAvailableSSlots();
  }, [docInfo]);

  const handleBookAppointment = () => {
    console.log(slotTime);
    console.log(slotIndex);
  };
  return docInfo ? (
    <div>
      {/* Doctor details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="">
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt="doctor-image"
          />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          {/* Doctors Information */}
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img
              className="w-5"
              src={assets.verified_icon}
              alt="verified-icon"
            />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>
          {/* Doctors about info */}
          <div className="">
            <p className="flex items-center gap-1 text-sm fonnt-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="info-icon" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>
          <p className="text-gray-500 mt-4 font-medium">
            Appointment fee:{" "}
            <span className="text-gray-600">${docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Doctor's available slots */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots &&
            docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSlotIndex(index);
                }}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? "bg-primary text-white"
                    : "border border-gray-200"
                }`}
              >
                <p>{daysOfWeek[item.date.getDay()]}</p>
                <p>{item.date.getDate()}</p>
                {/* <p>{item.timeSlots[slotIndex]?.time}</p> */}{" "}
              </div>
            ))}
        </div>
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots[slotIndex]?.timeSlots.map((item, index) => (
            <p
              onClick={() => setSlotTime(item.time)}
              key={index}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                item.time === slotTime
                  ? "bg-primary text-white"
                  : "border border-gray-300 text-gray-400"
              }`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button
          onClick={handleBookAppointment}
          className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
        >
          Book an appointment
        </button>
      </div>
      {/* //Related Doctors Component */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  ) : (
    <div className="flex justify-center items-center">
      <ClipLoader color="#5f6FFF" size={80} />
    </div>
  );
};

export default Appointment;
