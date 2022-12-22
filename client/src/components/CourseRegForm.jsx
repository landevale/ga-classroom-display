import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { DateTime } from "luxon";
import { courseRegSchema } from "../schemas/courseRegSchema";
import PropTypes from "prop-types";

function CourseRegForm({ setRefresh }) {
  CourseRegForm.propTypes = {
    setRefresh: PropTypes.func,
  };

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        courseCode: "",
        courseSchedule: "",
        startDate: "",
        endDate: "",
        daysOnCampus: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
        },
        altSaturdays: "none",
        startTime: "",
        endTime: "",
        classRoom: "",
      },
      validationSchema: courseRegSchema,
      onSubmit: async (values) => {
        try {
          const response = await fetch("/api/cohorts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          if (!response.ok) {
            throw new Error("Network response was not OK");
          }
          const data = await response.json();
          console.log(data);
          setRefresh(true);
          navigate("/courses");
        } catch (error) {
          console.log(values);
          setMsg("Something went wrong!");
        }
      },
    });

  console.log(values);
  console.log("Errors", errors);
  // const handleSubmit = (values) => {
  //   // Perform logic for handling form submission
  //   console.log(values);
  // };

  // const satOptions = ["No", "Odd - 1st Week", "Even - 2nd Week", "All"];

  return (
    <div>
      <fieldset>
        <legend>Course Registration Form</legend>
        <form onSubmit={handleSubmit}>
          <label>
            Course Code:
            <input
              type="text"
              name="courseCode"
              value={values.courseCode}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </label>
          {/* If validation is not passed show errors */}
          <p className="error">
            {errors.courseCode && touched.courseCode && errors.courseCode}
          </p>
          <br />
          <fieldset>
            <legend>Course Type:</legend>

            <label>
              <input
                type="radio"
                name="courseSchedule"
                value="FullTime"
                className="form-check-input"
                onChange={handleChange}
              />
              Full Time
            </label>
            <label>
              <input
                type="radio"
                name="courseSchedule"
                value="PartTime"
                className="form-check-input"
                onChange={handleChange}
              />
              Part Time
            </label>
            {/* If validation is not passed show errors */}
            <p className="error">
              {errors.courseSchedule &&
                touched.courseSchedule &&
                errors.courseSchedule}
            </p>
          </fieldset>
          <br />
          <br />
          <label>
            Start Date:{" "}
            <input
              type="date"
              name="startDate"
              min={DateTime.now().toFormat("yyyy-MM-dd")}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          <p className="error">
            {errors.startDate && touched.startDate && errors.startDate}
          </p>
          <br />
          <label>
            End Date:{" "}
            <input
              type="date"
              name="endDate"
              min={DateTime.now().toFormat("yyyy-MM-dd")}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          <p className="error">
            {errors.endDate && touched.endDate && errors.endDate}
          </p>
          <fieldset>
            <legend>Days on Campus:</legend>
            <input
              name="daysOnCampus.monday"
              type="checkbox"
              onChange={handleChange}
            />{" "}
            Monday
            <input
              name="daysOnCampus.tuesday"
              type="checkbox"
              onChange={handleChange}
            />{" "}
            Tuesday
            <input
              name="daysOnCampus.wednesday"
              type="checkbox"
              onChange={handleChange}
            />{" "}
            Wednesday
            <input
              name="daysOnCampus.thursday"
              type="checkbox"
              onChange={handleChange}
            />{" "}
            Thursday
            <input
              name="daysOnCampus.friday"
              type="checkbox"
              onChange={handleChange}
            />{" "}
            Friday
            <br />
            <label htmlFor="altSaturdays">Saturdays: </label>
            <select
              name="altSaturdays"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="none">None</option>
              <option value="odd">Odd</option>
              <option value="even">Even</option>
              <option value="all">All</option>
            </select>
          </fieldset>

          <br />
          <br />
          <label htmlFor="startTime">Start Time: </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            min="09:00"
            max="18:00"
            value={values.startTime}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="endTime">End Time: </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            min="09:00"
            max="18:00"
            value={values.endTime}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="classRoom">Classroom: </label>
          <select name="classRoom" onChange={handleChange}>
            <option value="" disabled selected>
              Select a classroom
            </option>
            <option value="1">Classroom 1</option>
            <option value="2">Classroom 2</option>
            <option value="3">Classroom 3</option>
            <option value="4">Classroom 4</option>
            <option value="5">Classroom 5</option>
            <option value="6">Classroom 6</option>
            <option value="">None</option>
          </select>
          <br />

          <button type="submit">Create Course</button>
          <p>{msg}</p>
        </form>
      </fieldset>
    </div>
  );
}

export default CourseRegForm;
