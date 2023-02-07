import React, { useContext, useState } from "react";
import { DataContext } from "../App";
import CourseRegForm from "../components/CourseRegForm";
import CoursesTable from "../components/CoursesTable";

function Courses() {
  const { isLoggedIn } = useContext(DataContext);
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <div>
        <h1>Courses</h1>
        <CoursesTable refresh={refresh} setRefresh={setRefresh} />
      </div>
      {isLoggedIn ? (
        <div>
          <h1>Course Registration</h1>
          <CourseRegForm setRefresh={setRefresh} />
        </div>
      ) : null}
    </>
  );
}

export default Courses;
