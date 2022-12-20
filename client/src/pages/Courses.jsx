import React, { useContext } from "react";
import { DataContext } from "../App";
import CourseRegForm from "../components/CourseRegForm";
import CoursesTable from "../components/CoursesTable";

function Courses() {
  const { isLoggedIn } = useContext(DataContext);

  return (
    <>
      <div>
        <h1>Courses</h1>
        <CoursesTable />
      </div>
      {isLoggedIn ? (
        <div>
          <h1>Course Registration</h1>
          <CourseRegForm />
        </div>
      ) : null}
    </>
  );
}

export default Courses;
