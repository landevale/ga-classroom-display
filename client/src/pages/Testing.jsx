import React, { useContext } from "react";
import FormTest from "../components/FormTest";
import CourseRegForm from "../components/CourseRegForm";
import FormTest3 from "../components/FormTest3";
// import { DataContext } from "../App";
// import CourseRegForm from "../components/CourseRegForm";
// import CoursesTable from "../components/CoursesTable";

function Testing() {
  //   const { isLoggedIn } = useContext(DataContext);

  return (
    <>
      <div>
        <h1>Testing</h1>
      </div>
      {/* <FormTest3 /> */}
      <CourseRegForm />
      {/* <FormTest /> */}
      {/* {isLoggedIn ? (
        <div>
          <h1>Course Registration</h1>
          <CourseRegForm />
        </div>
      ) : null} */}
    </>
  );
}

export default Testing;
