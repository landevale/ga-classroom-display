import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { DataContext } from "../App";

function CoursesTable() {
  const [courses, setCourses] = useState([]);
  const { isLoggedIn } = useContext(DataContext);

  useEffect(() => {
    fetch("/api/cohorts/")
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);

  const handleDelete = (id, i) => () => {
    fetch(`/api/cohorts/${id}`, {
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
          <th>Sat on Campus</th>
          <th>Classroom</th>
          <th>Weeks</th>
          {isLoggedIn ? <th>Edit / Delete</th> : null}
        </tr>
      </thead>
      <tbody>
        {courses.map((course, i) => (
          <tr key={i}>
            <td>{course.courseCode}</td>
            <td>{course.courseSchedule}</td>
            <td>{DateTime.fromISO(course.startDate).toISODate()}</td>
            <td>{DateTime.fromISO(course.endDate).toISODate()}</td>
            <td>Days on Campus</td>
            <td>{course.startTime}</td>
            <td>{course.endTime}</td>
            <td>{course.altSaturdays}</td>
            <td>{course.classRoom}</td>
            <td>{course.weeks}</td>
            {isLoggedIn ? (
              <td>
                <Link to={`/editcourse/${course._id}`}>📝</Link>
                <button onClick={handleDelete(course._id, i)}>X</button>
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CoursesTable;
