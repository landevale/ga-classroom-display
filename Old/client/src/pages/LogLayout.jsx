import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { DataContext } from "../App";
import Banner from "../components/Banner";

function LogLayout() {
  const { setUser, setIsLoggedIn } = useContext(DataContext);

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

  return (
    <>
      <Banner />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default LogLayout;
