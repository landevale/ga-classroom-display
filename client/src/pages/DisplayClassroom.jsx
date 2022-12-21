import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mainLogo from "../assets/CMYK-White-Red_Small_GeneralAssembly-Horizontal.png";
import { useParams } from "react-router-dom";

function DisplayClassroom() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((countdown) => countdown - 1);
      if (countdown === 0) {
        window.location.reload();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  const { id } = useParams();
  return (
    <>
      <main style={{ backgroundColor: "grey" }}>
        <h1>CLASSROOM {id}</h1>
        <hr />
        <h2>SEI-40</h2>
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
