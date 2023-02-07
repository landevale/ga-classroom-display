import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import CourseEditForm from "../components/CourseEditForm";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(DataContext);

  return isLoggedIn ? (
    <>
      <h1>Edit Course</h1>
      <CourseEditForm id={id} />
    </>
  ) : (
    navigate("/")
  );
}

export default EditCourse;
