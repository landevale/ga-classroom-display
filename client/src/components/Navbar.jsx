import React from "react";
import { Link as NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <h1>General Assembly Singapore</h1>
        <h2>Classroom Display</h2>
        <a>
          <NavLink to="/">Home</NavLink>
        </a>
        {"    "}
        <a>
          <NavLink to="/courses">Courses</NavLink>
        </a>
        {"    "}
        <a>
          <NavLink to="/bookings">Bookings</NavLink>
        </a>
      </nav>

      <br />
    </>
  );
}

export default Navbar;
