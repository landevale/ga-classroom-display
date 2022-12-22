import React, { useContext, useEffect } from "react";
import { Link as NavLink, Link, useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import mainLogo from "../assets/CMYK-White-Red_Small_GeneralAssembly-Horizontal.png";
import fallbackLogo from "../assets/General-Assembly-logo.png";
import UserInfo from "./UserInfo";

function Navbar() {
  const navigate = useNavigate();

  const { setUser, isLoggedIn, setIsLoggedIn } = useContext(DataContext);
  // console.log(user);

  useEffect(() => {
    async function checkLogin() {
      const response = await fetch("/api/login-status");
      const data = await response.json();
      setIsLoggedIn(data.loggedIn);
    }
    checkLogin();
  }, []);

  useEffect(() => {
    async function checkLogin() {
      const response = await fetch("/api/username");
      const data = await response.json();
      setUser(data.username);
    }
    checkLogin();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await fetch("api/logout", {
        method: "GET",
      });
      setUser("");
      setIsLoggedIn(false);
      navigate("/logout");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <nav className="navbar">
        <a>
          <Link to="/">
            <img
              src={mainLogo}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackLogo;
              }}
              style={{ width: 500, height: "auto", backgroundColor: "black" }}
              alt="GENERAL ASSEMBLY"
            />
          </Link>
        </a>
        <h2>Classroom Display</h2>
        <a>
          <NavLink to="/">Home</NavLink>
        </a>
        {"    "}
        <a>
          <NavLink to="/courses">Courses</NavLink>
        </a>
        {"    "}

        <a>{isLoggedIn ? <NavLink to="/bookings">Bookings</NavLink> : null}</a>
        {"    "}
        <a>
          <NavLink to="/display">Display</NavLink>
        </a>
        {"    "}

        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button>
            <Link to="/login">Login</Link>
          </button>
        )}

        <UserInfo />
      </nav>

      <br />
    </>
  );
}

export default Navbar;
