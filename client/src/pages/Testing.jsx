import React, { useContext } from "react";
import FormTest from "../components/FormTest";
import FormTest2 from "../components/FormTest2";
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
      <FormTest2 />
      <FormTest />
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
