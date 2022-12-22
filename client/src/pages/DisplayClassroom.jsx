import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import mainLogo from "../assets/CMYK-White-Red_Small_GeneralAssembly-Horizontal.png";
import { useParams } from "react-router-dom";
import useCalDisplayLogic from "../components/CalDisplayLogic";
import { DataContext } from "../App";

function DisplayClassroom() {
  // const { occupiedBy } = useContext(DataContext);
  const [countdown, setCountdown] = useState(10);

  const calDisplayLogic = useCalDisplayLogic();
  // console.log("CALDisLogic", calDisplayLogic);
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((countdown) => countdown - 1);
      if (countdown === 0) {
        window.location.reload();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown, calDisplayLogic]);

  const { id } = useParams();

  const [cohortState, setCohortState] = useState([]);
  useEffect(() => {
    fetch("/api/cohorts/")
      .then((response) => response.json())
      .then((data) => setCohortState(data));
  }, []);
  const [bookingsState, setBookingsState] = useState([]);
  useEffect(() => {
    fetch("/api/bookings/")
      .then((response) => response.json())
      .then((data) => setBookingsState(data));
  }, []);

  // console.log(bookingsState);
  let classRoomUser = calDisplayLogic[id - 1]?.[0];

  let bookingsStateFilter = bookingsState?.filter(
    (ele) => ele.roomUseBy === classRoomUser
  );

  // let bookingsStateFilter = true;
  // let bookingsStartTime = bookingsStateFilter.
  // let bookingsEndTime =

  let cohortStateFilter = cohortState?.filter(
    (ele) => ele.courseCode === classRoomUser
  );
  let cohortStartTime = cohortStateFilter[0]?.startTime;
  let cohortEndTime = cohortStateFilter[0]?.endTime;

  // console.log("CS.Filter = ", cohortStateFilter);
  // console.log("CS.SD",cohortStateFilter[0]?.startTime)
  // let cohortStateEndTime = ;

  return (
    <>
      <main style={{ backgroundColor: "grey" }}>
        <h1>CLASSROOM {id}</h1>
        <hr />
        <h2>{calDisplayLogic[id - 1]?.[0]}</h2>
        {/* <h3>Purpose</h3> */}
        {bookingsStateFilter ? null : (
          <p>
            {cohortStartTime} - {cohortEndTime}
          </p>
        )}
        <p>Placeholder: {countdown} seconds remaining until refresh.</p>
        <a>
          <Link to="/">
            <img
              src={mainLogo}
              style={{ width: 500, height: "auto" }}
              alt="GENERAL ASSEMBLY"
            />
          </Link>
        </a>
      </main>
    </>
  );
}

export default DisplayClassroom;
