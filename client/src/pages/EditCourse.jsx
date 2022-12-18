import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
// import { DataContext } from "../App";

function EditCourse() {
  const { code } = useParams();

  return (
    <>
      <Navbar />
      <h1>Edit Course {code}</h1>
    </>
  );
}

export default EditCourse;
