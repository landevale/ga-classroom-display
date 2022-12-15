import React from "react";
import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";

function LogLayout() {
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
