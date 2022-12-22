import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { DataContext } from "../App";
import PropTypes from "prop-types";

function BookingsTable({ refresh, setRefresh }) {
  BookingsTable.propTypes = {
    refresh: PropTypes.bool,
    setRefresh: PropTypes.func,
  };
  const [bookings, setBookings] = useState([]);
  const { isLoggedIn } = useContext(DataContext);

  useEffect(() => {
    fetch("/api/bookings/")
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
        setRefresh(false); // Reset refresh to false
      });
  }, [refresh]);

  const handleDelete = (id) => () => {
    fetch(`/api/bookings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      // eslint-disable-next-line
      .then((data) => {
        setBookings(bookings.filter((h) => h._id !== id));
      });
  };

  return (
    <table border="1">
      <caption>Bookings & Holidays</caption>
      <thead>
        <tr>
          <th>Room User</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Classroom</th>
          <th>Holiday</th>
          <th>Cohort</th>
          <th>Purpose</th>
          {isLoggedIn ? <th>Edit / Delete</th> : null}
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, i) => (
          <tr key={i}>
            <td>{booking.roomUseBy}</td>
            <td>
              {DateTime.fromISO(booking.bookingStart).toLocaleString(
                DateTime.DATE_MED_WITH_WEEKDAY
              )}
            </td>
            <td>
              {DateTime.fromISO(booking.bookingEnd).toLocaleString(
                DateTime.DATE_MED_WITH_WEEKDAY
              )}
            </td>
            <td>{booking.classRoom}</td>
            <td>{booking.holiday}</td>
            <td>{booking.cohort}</td>
            <td>{booking.Purpose}</td>
            {isLoggedIn ? (
              <td>
                <Link to={`/editcourse/${booking._id}`}>📝</Link>
                <button onClick={handleDelete(booking._id, i)}>X</button>
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookingsTable;
