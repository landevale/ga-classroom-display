import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import BookingEditForm from "../components/BookingEditForm";

function EditBooking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(DataContext);

  return isLoggedIn ? (
    <>
      <h1>Edit Bookings</h1>
      <BookingEditForm id={id} />
    </>
  ) : (
    navigate("/")
  );
}

export default EditBooking;
