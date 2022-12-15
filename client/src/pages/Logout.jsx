import React from "react";
import { Link } from "react-router-dom";

function Logout() {
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
