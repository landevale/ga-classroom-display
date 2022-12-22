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

  const [sort, setSort] = useState({ key: "bookingStart", order: "asc" });

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

  // Sorting bookings
  const handleSort = (key) => {
    setSort({ key, order: sort.order === "asc" ? "desc" : "asc" });
  };

  const sortedBookings = bookings.sort((a, b) => {
    const aValue = a[sort.key];
    const bValue = b[sort.key];
    if (aValue < bValue) {
      return sort.order === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sort.order === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <table border="1">
      <caption>Bookings & Holidays</caption>
      <thead>
        <tr>
          <th>Room User</th>
          <th onClick={() => handleSort("bookingStart")}>
            Start Date{" "}
            {sort.key === "bookingStart"
              ? sort.order === "asc"
                ? "▲"
                : "▼"
              : ""}
          </th>
          <th onClick={() => handleSort("bookingEnd")}>
            End Date{" "}
            {sort.key === "bookingEnd"
              ? sort.order === "asc"
                ? "▲"
                : "▼"
              : ""}
          </th>
          <th>Classroom</th>
          <th>Holiday</th>
          <th>Cohort</th>
          <th>Purpose</th>
          {isLoggedIn ? <th>Edit / Delete</th> : null}
        </tr>
      </thead>
      <tbody>
        {sortedBookings
          .filter(
            (booking) =>
              DateTime.fromISO(booking.bookingEnd).startOf("day") >=
              DateTime.local().startOf("day")
          ) //Filter bookings based on end date
          .map((booking, i) => (
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
              <td>{booking.bookingPurpose}</td>
              {isLoggedIn ? (
                <td>
                  <Link to={`/editbooking/${booking._id}`}>📝</Link>
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
