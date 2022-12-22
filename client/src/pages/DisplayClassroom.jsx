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
  console.log("CALDisLogic", calDisplayLogic);
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
  return (
    <>
      <main style={{ backgroundColor: "grey" }}>
        <h1>CLASSROOM {id}</h1>
        <hr />
        <h2>{calDisplayLogic[id-1]?.[0]}</h2>
        <h3>Purpose</h3>
        <p>Start time - End time</p>
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
