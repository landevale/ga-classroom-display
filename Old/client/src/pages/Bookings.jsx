import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import BookingForm from "../components/BookingForm";
import BookingsTable from "../components/BookingsTable";

function Bookings() {
  const { isLoggedIn } = useContext(DataContext);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  return isLoggedIn ? (
    <>
      <div>
        <h1>Bookings</h1>
      </div>
      <div>
        <BookingForm setRefresh={setRefresh} />
      </div>
      <div>
        <BookingsTable refresh={refresh} setRefresh={setRefresh} />
      </div>
    </>
  ) : (
    navigate("/")
  );
}

export default Bookings;
