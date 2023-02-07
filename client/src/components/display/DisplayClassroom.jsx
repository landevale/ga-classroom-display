import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import calendarDisplayLogic from "../home/DisplayLogic";

export default function DisplayClassroom() {
  const { id } = useParams();
  //==================================
  //REFRESH TIMER HERE -> Change to desired amount, in seconds
  const [countdown, setCountdown] = useState(120);
  //==================================
  const calDisplayLogic = calendarDisplayLogic();
  //   useEffect(() => {
  console.log(calDisplayLogic);
  //   }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        setCountdown((countdown) => countdown - 1);
        if (countdown === 0) {
          window.location.reload();
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [countdown, calDisplayLogic]);

  const [cohortState, setCohortState] = useState([]);

  const fetchCohort = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/cohorts`
        // `/api/cohorts`
      );
      if (response) {
        setCohortState(response);
        // console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchCohort();
  }, []);
  console.log(cohortState);
  const [bookingsState, setBookingsState] = useState([]);

  const fetchBooking = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/bookings`
        // `/api/bookings`
      );
      if (response) {
        setBookingsState(response);
        // console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchBooking();
  }, []);

  let classRoomUser = calDisplayLogic[id - 1]?.[0];

  //   let bookingsStateFilter = bookingsState?.filter(
  //     (ele) => ele.roomUseBy === classRoomUser
  //   );

  let cohortStateFilter = Array.isArray(cohortState.data)
    ? cohortState.data.filter((ele) => ele.courseCode === classRoomUser)
    : [];
  console.log(cohortStateFilter);
  let cohortStartTime = cohortStateFilter[0]?.startTime;
  let cohortEndTime = cohortStateFilter[0]?.endTime;

  console.log(cohortStartTime);
  console.log(cohortEndTime);

  return (
    <div className=" h-screen w-screen bg-black py-[5vh] flex flex-col">
      <div className=" h-[40vh] flex">
        <h1 className=" text-6xl text text-white m-auto">CLASSROOM {id}</h1>
      </div>
      <hr className=" border-white border-2 w-[70vw] m-auto" />
      <br />
      <div className="m-auto">
        <h2 className="text-7xl text-center text-white ">
          {calDisplayLogic[id - 1]?.[0]}
        </h2>
        {cohortStartTime && cohortEndTime && (
          <p className="text-white text-5xl text-center pt-6">
            {cohortStartTime} - {cohortEndTime}
          </p>
        )}
        {/* <p className="text-white text-center">
          Placeholder: {countdown} seconds remaining until refresh.
        </p> */}
        <br />
        <br />
        <a>
          <Link to="/">
            <img
              src={"/CMYK-White-Red_Small_GeneralAssembly-Horizontal.png"}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackLogo;
              }}
              className=" h-auto w-[60vw]"
              //   style={{ width: 500, height: "auto" }}
              alt="GENERAL ASSEMBLY"
            />
          </Link>
        </a>
      </div>
    </div>
  );
}
