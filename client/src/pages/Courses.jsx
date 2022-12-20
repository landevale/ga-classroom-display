import React, { useContext } from "react";
import { DataContext } from "../App";
import CourseRegForm from "../components/CourseRegForm";
import CoursesTable from "../components/CoursesTable";

function Courses() {
  const { user, setUser, notLoggedIn, setNotLoggedIn } =
    useContext(DataContext);
  console.log(user);

  return (
    <>
      <div>
        <h1>Courses</h1>
        <CoursesTable />
      </div>
      {notLoggedIn ? null : (
        <div>
          <h1>Course Registration</h1>
          <CourseRegForm />
        </div>
      )}
    </>
  );
}

export default Courses;
