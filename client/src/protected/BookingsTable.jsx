import React, { useEffect, useState, useContext } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { DateTime } from "luxon";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BookingsTable() {
  const [bookings, setBookings] = useState([]);
  const [sort, setSort] = useState({ key: "bookingStart", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");

  // Search
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchBookings = async () => {
    try {
      const { data: response } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/bookings`
        // `/api/cohorts`
      );
      if (response) {
        setBookings(response);
        // console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchBookings();
}, []);
console.log(bookings)

//   const handleDelete = (id) => () => {
//     fetch(`/api/bookings/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       // eslint-disable-next-line
//       .then((data) => {
//         setBookings(bookings.filter((h) => h._id !== id));
//       });
//   };

  //====================================================
  //HANDLE DELETE
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/bookings/${id}`
      );
      if (response) {
        setBookings(bookings.filter((h) => h._id !== id));
        // setConfirmDelete({show:false,id:""})
        // setShow(true);
      }
    } catch (error) {
      console.log(error.message);
    //   return setOpen(true); //open FailMsg
    }

  };


  const filteredBookings = bookings.filter(
    (booking) =>
      searchQuery === "" ||
      booking.roomUseBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting Filtered Bookings
  const handleSort = (key) => {
    setSort({ key, order: sort.order === "asc" ? "desc" : "asc" });
  };

  const sortedFilteredBookings = filteredBookings.sort((a, b) => {
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
    <>
      <div className="">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto py-5">
              <h1 className="text-xl font-semibold text-gray-900">Bookings</h1>
              <p className="mt-2 text-sm text-gray-700">
                Bookings and Holidays
              </p>
            </div>
          </div>

          <label htmlFor="search" className="sr-only">
            Search by Bookings
          </label>

          <div className="relative mt-6 w-full text-gray-400 focus-within:text-gray-600">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
              <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="search-field"
              className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
              placeholder="Search bookings (Used by)"
              type="search"
              name="search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr className="divide-x divide-gray-200">
                        <th
                          scope="col"
                          className="py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Room User
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("bookingStart")}
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Start Date{" "}
                          {sort.key === "bookingStart"
                            ? sort.order === "asc"
                              ? "▲"
                              : "▼"
                            : ""}
                        </th>
                        <th
                          scope="col"
                          onClick={() => handleSort("bookingEnd")}
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          End Date{" "}
                          {sort.key === "bookingEnd"
                            ? sort.order === "asc"
                              ? "▲"
                              : "▼"
                            : ""}
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Classroom
                        </th>{" "}
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Holiday
                        </th>{" "}
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Cohort
                        </th>{" "}
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Purpose
                        </th>{" "}
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Edit / Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {sortedFilteredBookings
                        .filter(
                          (booking) =>
                            DateTime.fromISO(booking.bookingEnd).startOf(
                              "day"
                            ) >= DateTime.local().startOf("day")
                        ) //Filter bookings based on end date
                        .map((booking, i) => (
                          <>
                            {/* {" "}
                            {console.log("Sorted ", sortedFilteredCourses)}
                            {console.log("Filtered ", filteredCourses)}
                            {console.log("Filter and map", courses)}
                            {console.log("course.classRoom", course.classRoom)} */}
                            <tr className="divide-x divide-gray-200" key={i}>
                              <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                {booking.roomUseBy}
                              </td>
                              <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                {DateTime.fromISO(
                                  booking.bookingStart
                                ).toLocaleString(
                                  DateTime.DATE_MED_WITH_WEEKDAY
                                )}
                              </td>
                              <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                {DateTime.fromISO(
                                  booking.bookingEnd
                                ).toLocaleString(
                                  DateTime.DATE_MED_WITH_WEEKDAY
                                )}
                              </td>
                              <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                {booking.classRoom}
                              </td>
                              <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                {booking.holiday? ("Yes"):("No")}
                              </td>
                              <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                {booking.cohort}
                              </td>
                              <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                {booking.bookingPurpose}
                              </td>

                              <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                <Link to={`/admin/bookings/${booking._id}`}>
                                  📝
                                </Link>
                                <button
                                  onClick={() => handleDelete(booking._id, i)}
                                >
                                  X
                                </button>
                              </td>
                            </tr>
                          </>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
