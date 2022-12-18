import React from "react";
import CourseRegForm from "../components/CourseRegForm";
import CoursesTable from "../components/CoursesTable";

function Courses() {
  return (
    <>
      <div>
        <h1>Courses</h1>
        <CoursesTable />
      </div>
      <div>
        <h1>Course Registration</h1>
        <CourseRegForm />
      </div>
    </>
  );
}

export default Courses;
