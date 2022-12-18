import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CoursesTable() {
  const [courses, setCourses] = useState([
    {
      courseCode: "SEI-40",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "18 December 2022 at 00:00 GMT+8",
      endDate: "24 January 2023 at 00:00 GMT+8",
      daysOnCampus: {
        days: [
          { value: "Mon", label: "Monday" },
          { value: "Tue", label: "Tuesday" },
        ],
      },
      startTime: "09:30", //need start/end-time(?) Do we need to display "hours" in daily calendar?
      endTime: "17:30",
      classRoom: "4",
      weeks: "9",
      altSaturdays: "None", //none, odd, even, ALL
      _id: "6397f11217ab9b774912e1a2",
      __v: 0,
      createdAt: "2022-12-13T03:27:14.780Z",
      updatedAt: "2022-12-13T03:27:14.780Z",
    },
  ]);

  //   useEffect(() => {
  //     fetch("/cohorts/")
  //       .then((response) => response.json())
  //       .then((data) => setHolidays(data));
  //   }, []);

  const handleDelete = (id, i) => () => {
    fetch(`/api/holidays/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCourses(courses.filter((h) => h._id !== id));
      });
  };

  return (
    <table border="1">
      <caption>Courses</caption>
      <thead>
        <tr>
          <th>Cohort</th>
          <th>Type</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Days</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Days on Campus</th>
          <th>Classroom</th>
          <th>Weeks</th>
          <th>Sat on Campus</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, i) => (
          <tr key={i}>
            <td>{course.cohortCode}</td>
            <td>{course.likes}</td>
            <td>
              <Link to="/">🎈</Link>
              <Link to={`/editholiday/${course._id}`}>📝</Link>
              <button onClick={handleDelete(course._id, i)}>X</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CoursesTable;
