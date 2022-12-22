import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../App";

function Logout() {
  const { setUser, setIsLoggedIn } = useContext(DataContext);

  useEffect(() => {
    async function logout() {
      const response = await fetch("api/logout", {
        method: "GET",
      });
      setUser("");
      // setNotLoggedIn(true);
      setIsLoggedIn(false);
      console.log("Response", response);
    }
    logout();
  }, []);

  return (
    <>
      <div>
        <h1>LOG OUT</h1>
        <p>
          You are logged out. Return to{" "}
          <a>
            <Link to="/login">login.</Link>
          </a>
        </p>
      </div>
    </>
  );
}

export default Logout;
