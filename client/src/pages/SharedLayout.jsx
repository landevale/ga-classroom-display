import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function SharedLayout() {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default SharedLayout;
