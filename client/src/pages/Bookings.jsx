import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import BookingForm from "../components/BookingForm";

function Bookings() {
  const { isLoggedIn } = useContext(DataContext);
  const navigate = useNavigate();

  return isLoggedIn ? (
    <>
      <div>
        <h1>Bookings</h1>
      </div>
      <div>
        <BookingForm />
      </div>
    </>
  ) : (
    navigate("/")
  );
}

export default Bookings;
