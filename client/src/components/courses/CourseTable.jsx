import React, { useEffect, useState, useContext } from "react";
import { UserAuth } from "../../context/AuthContext";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";

export default function CourseTable() {
  const [user, setUser] = UserAuth();
  const [courses, setCourses] = useState([]);
  const [selectedClassRoom, setSelectedClassRoom] = useState("");
  const [sort, setSort] = useState({ key: "startDate", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Search
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    console.log("selectedClassRoom", selectedClassRoom);
  }, [selectedClassRoom]);

  const fetchCohort = async () => {
    try {
      const { data: response } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/cohorts`
        // `/api/cohorts`
      );
      if (response) {
        setCourses(response);
        // console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchCohort();
    setIsLoading(false);
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      searchQuery === "" ||
      course.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //====================================================
  //HANDLE DELETE
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/cohorts/${id}`
      );
      if (response) {
        setCourses(courses.filter((h) => h._id !== id));
        // setConfirmDelete({show:false,id:""})
        // setShow(true);
      }
    } catch (error) {
      console.log(error.message);
      // return setOpen(true); //open FailMsg
    }

  };
  //======================================================
  // Sorting Filtered Courses
  const handleSort = (key) => {
    setSort({ key, order: sort.order === "asc" ? "desc" : "asc" });
  };

  const sortedFilteredCourses = filteredCourses.sort((a, b) => {
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
              <h1 className="text-xl font-semibold text-gray-900">Courses</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all courses and corresponding details. *Completed
                courses are automatically filtered out.
              </p>
            </div>
          </div>

          <label htmlFor="search" className="sr-only">
            Search by course
          </label>

          <div className="relative mt-6 w-full text-gray-400 focus-within:text-gray-600">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
              <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="search-field"
              className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
              placeholder="Search by course"
              type="search"
              name="search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="pt-2">
            <select
              value={selectedClassRoom}
              onChange={(event) => setSelectedClassRoom(event.target.value)}
            >
              Show Classrooms:
              <option value="">Show all</option>
              <option value="1">Classroom 1</option>
              <option value="2">Classroom 2</option>
              <option value="3">Classroom 3</option>
              <option value="4">Classroom 4</option>
              <option value="5">Classroom 5</option>
              <option value="6">Classroom 6</option>
            </select>
          </div>
          {isLoading ? (
            // Show a loading placeholder or message while the data is being fetched
            <div>Loading...</div>
          ) : (
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
                            Cohort
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Type
                          </th>
                          <th
                            scope="col"
                            onClick={() => handleSort("startDate")}
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Start Date{" "}
                            {sort.key === "startDate"
                              ? sort.order === "asc"
                                ? "▲"
                                : "▼"
                              : ""}
                          </th>
                          <th
                            scope="col"
                            onClick={() => handleSort("endDate")}
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            End Date{" "}
                            {sort.key === "endDate"
                              ? sort.order === "asc"
                                ? "▲"
                                : "▼"
                              : ""}
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Days
                          </th>{" "}
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Start Time
                          </th>{" "}
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            End Time
                          </th>{" "}
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Sat on Campus
                          </th>{" "}
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Classroom
                          </th>
                          {user.data ? (
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Edit / Delete
                            </th>
                          ) : null}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {sortedFilteredCourses
                          .filter(
                            (course) =>
                              selectedClassRoom === "" ||
                              (course.classRoom &&
                                course.classRoom == selectedClassRoom)
                          ) //Filter courses based on classroom
                          .filter(
                            (course) =>
                              DateTime.fromISO(course.endDate).startOf("day") >=
                              DateTime.local().startOf("day")
                          ) //Filter courses based on end date
                          .map((course, i) => (
                            <>
                              {" "}
                              {console.log("Sorted ", sortedFilteredCourses)}
                              {console.log("Filtered ", filteredCourses)}
                              {console.log("Filter and map", courses)}
                              {console.log(
                                "course.classRoom",
                                course.classRoom
                              )}
                              <tr className="divide-x divide-gray-200" key={i}>
                                <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                  {course.courseCode}
                                </td>
                                <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                  {course.courseSchedule}
                                </td>
                                <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                  {DateTime.fromISO(
                                    course.startDate
                                  ).toLocaleString(
                                    DateTime.DATE_MED_WITH_WEEKDAY
                                  )}
                                </td>
                                <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                  {DateTime.fromISO(
                                    course.endDate
                                  ).toLocaleString(
                                    DateTime.DATE_MED_WITH_WEEKDAY
                                  )}
                                </td>
                                <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                  {Object.entries(course.daysOnCampus)
                                    .map(([day, isOnCampus]) =>
                                      isOnCampus
                                        ? day.slice(0, 1).toUpperCase() +
                                          day.slice(1, 3)
                                        : null
                                    )
                                    .filter((day) => day !== null)
                                    .join(", ")}
                                </td>
                                <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                  {course.startTime}
                                </td>
                                <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                  {course.endTime}
                                </td>
                                <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                  {course.altSaturdays}
                                </td>
                                <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                  {course.classRoom}
                                </td>
                                {/* <td>{course.weeks}</td> */}
                                {user.data ? (
                                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                    <Link to={`/admin/course/${course._id}`}>
                                      📝
                                    </Link>
                                    <button
                                      onClick={()=>handleDelete(course._id, i)}
                                    >
                                      X
                                    </button>
                                  </td>
                                ) : null}
                              </tr>
                            </>
                          ))}

                      
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
