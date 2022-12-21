import React from "react";
import { useFormik, Formik, Field, Form } from "formik";
import { DateTime } from "luxon";
import DaysDropdown from "./DaysDropdown";
import ClassroomDropdown from "./ClassroomDropdown";
import { courseRegSchema } from "../schemas/CourseRegSchema";

function FormTest2() {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        courseCode: "",
        courseSchedule: "",
        startDate: "",
        endDate: "",
        // daysOnCampus: [{}],
        // altSaturdays: "",
        startTime: "",
        endTime: "",
        classRoom: "",
      },
      validationSchema: courseRegSchema,
      onSubmit: (values) => {
        console.log("Form date", values);
      },
    });

  console.log(values);
  console.log("Errors", errors);
  // const handleSubmit = (values) => {
  //   // Perform logic for handling form submission
  //   console.log(values);
  // };

  // const classroomOptions = [
  //   { value: "1", label: "Classrooom 1" },
  //   { value: "2", label: "Classrooom 2" },
  //   { value: "3", label: "Classrooom 3" },
  //   { value: "4", label: "Classrooom 4" },
  //   { value: "5", label: "Classrooom 5" },
  //   { value: "6", label: "Classrooom 6" },
  // ];

  // const dayOptions = [
  //   { value: "Mon", label: "Monday" },
  //   { value: "Tue", label: "Tuesday" },
  //   { value: "Wed", label: "Wednesday" },
  //   { value: "Thu", label: "Thursday" },
  //   { value: "Fri", label: "Friday" },
  // ];

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
              //==================
              //This confirms that when user is in Singapore, the input time is GMT+8, contrary to seeded data
              onChange={handleChange}
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
              //==================
              //This confirms that when user is in Singapore, the input time is GMT+8, contrary to seeded data
              onChange={handleChange}
            />
          </label>
          <p className="error">
            {errors.endDate && touched.endDate && errors.endDate}
          </p>

          {/* <br />
        <br />
        <DaysDropdown
          isSearchable
          isMulti
          placeHolder="Days on Campus"
          dayOptions={dayOptions}
          onChange={handleChange}
        /> */}
          {/* <MultiDaySelect /> */}
          {/* <br />
        <br />

        <label htmlFor="altSaturdays">Saturdays: </label>
        <select
          name="altSaturdays"
          value={values.altSaturdays}
          onChange={handleChange}
        >
          {satOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select> */}

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
          {/* <label htmlFor="classRoom">Classroom: </label>
          <select name="classRoom" onChange={handleChange}>
            <option value="" disabled>
              Select an option
            </option>
            <option value="1">Classroom 1</option>
            <option value="2">Classroom 2</option>
            <option value="3">Classroom 3</option>
            <option value="4">Classroom 4</option>
            <option value="5">Classroom 5</option>
            <option value="6">Classroom 6</option>
          </select> */}

          <fieldset>
            <legend>Classroom:</legend>
            <label>
              <input
                type="radio"
                name="classRoom"
                value="1"
                className="form-check-input"
                onChange={handleChange}
              />
              Classroom 1
            </label>
            <label>
              <input
                type="radio"
                name="classRoom"
                value="2"
                className="form-check-input"
                onChange={handleChange}
              />
              Classroom 2
            </label>
            <label>
              <input
                type="radio"
                name="classRoom"
                value="3"
                className="form-check-input"
                onChange={handleChange}
              />
              Classroom 3
            </label>
            <label>
              <input
                type="radio"
                name="classRoom"
                value="4"
                className="form-check-input"
                onChange={handleChange}
              />
              Classroom 4
            </label>
            <label>
              <input
                type="radio"
                name="classRoom"
                value="5"
                className="form-check-input"
                onChange={handleChange}
              />
              Classroom 5
            </label>
            <label>
              <input
                type="radio"
                name="classRoom"
                value="6"
                className="form-check-input"
                onChange={handleChange}
              />
              Classroom 6
            </label>
          </fieldset>

          <button type="submit">Create Course</button>
        </form>
      </fieldset>
    </div>
  );
}

export default FormTest2;
