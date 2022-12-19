import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function SharedLayout({ user }) {
  return (
    <>
      <Navbar user={user} />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default SharedLayout;
