import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log("Log in");
    navigate("/");
  };
  //   const handleLogin = (info) => async () => {
  //     const response = await fetch("/api/sessions", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(info),
  //     });
  //     console.log(response);

  //     if (response.ok) {
  //       fetch("/api/secret")
  //         .then((request) => request.json())
  //         .then((data) => setMsg(data));
  //       navigate("/holidays/");
  //       setNotLoggedIn(false);
  //       console.log(notLoggedIn);
  //     }
  //   };

  return (
    <>
      <div>
        <fieldset>
          <legend>LOG IN</legend>
          <label>
            Username: <input name="username" />
          </label>
          {"   "}
          <label>
            Password: <input name="password" />
          </label>
          <button onClick={handleLogin}>Log In</button>
        </fieldset>
      </div>
    </>
  );
}

export default Login;
