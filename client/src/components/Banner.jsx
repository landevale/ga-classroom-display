import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../App";
import mainLogo from "../assets/CMYK-White-Red_Small_GeneralAssembly-Horizontal.png";

function Banner() {
  const { setIsLoggedIn } = useContext(DataContext);

  useEffect(() => {
    async function checkLogin() {
      const response = await fetch("/api/login-status");
      const data = await response.json();
      setIsLoggedIn(data.loggedIn);
    }
    checkLogin();
  }, []);

  return (
    <>
      <nav>
        <a>
          <Link to="/">
            <img
              src={mainLogo}
              style={{ width: 500, height: "auto", backgroundColor: "black" }}
              alt="GENERAL ASSEMBLY"
            />
          </Link>
        </a>
      </nav>

      <br />
    </>
  );
}

export default Banner;
