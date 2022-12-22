import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mainLogo from "../assets/CMYK-White-Red_Small_GeneralAssembly-Horizontal.png";
import fallbackLogo from "../assets/General-Assembly-logo.png";
import { useParams } from "react-router-dom";
import useCalDisplayLogic from "../components/CalDisplayLogic";

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

  // eslint-disable-next-line
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
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "black" }}>
      <div
        style={{
          height: "40vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "white" }}>CLASSROOM {id}</h1>
      </div>
      <hr style={{ color: "white", borderWidth: "2px" }} />
      <h2 style={{ fontSize: "36px", color: "white" }}>
        {calDisplayLogic[id - 1]?.[0]}
      </h2>
      <p style={{ fontSize: "28px", color: "white" }}>
        {cohortStartTime} - {cohortEndTime}
      </p>
      <p style={{ color: "white" }}>
        Placeholder: {countdown} seconds remaining until refresh.
      </p>
      <a>
        <Link to="/">
          <img
            src={mainLogo}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackLogo;
            }}
            style={{ width: 500, height: "auto" }}
            alt="GENERAL ASSEMBLY"
          />
        </Link>
      </a>
    </div>
  );
}

export default DisplayClassroom;
