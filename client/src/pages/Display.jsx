import React from "react";
import { Link } from "react-router-dom";
import mainLogo from "../assets/CMYK-White-Red_Small_GeneralAssembly-Horizontal.png";
// import { useParams } from "react-router-dom";

function Display() {
  // const { id } = useParams();
  return (
    <>
      <main style={{ backgroundColor: "grey" }}>
        <h1>CLASSROOM 4</h1>
        <hr />
        <h2>SEI-40</h2>
        <h3>Purpose</h3>
        <p>Start time - End time</p>
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

export default Display;
