import React from "react";
import { useFormik, Formik, Field, Form } from "formik";
import { DateTime } from "luxon";
import { courseRegSchema } from "../schemas/courseRegSchema";

function FormTest2() {
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

          <fieldset>
            <legend>Classroom:</legend>
            <label>
              Classroom 1
              <input
                type="radio"
                name="classRoom"
                value="1"
                className="form-check-input"
                onChange={handleChange}
              />
            </label>

            <label>
              Classroom 2
              <input
                type="radio"
                name="classRoom"
                value="2"
                className="form-check-input"
                onChange={handleChange}
              />
            </label>
            <label>
              Classroom 3
              <input
                type="radio"
                name="classRoom"
                value="3"
                className="form-check-input"
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Classroom 4
              <input
                type="radio"
                name="classRoom"
                value="4"
                className="form-check-input"
                onChange={handleChange}
              />
            </label>
            <label>
              Classroom 5
              <input
                type="radio"
                name="classRoom"
                value="5"
                className="form-check-input"
                onChange={handleChange}
              />
            </label>
            <label>
              Classroom 6
              <input
                type="radio"
                name="classRoom"
                value="6"
                className="form-check-input"
                onChange={handleChange}
              />
            </label>
          </fieldset>
          <button type="submit">Create Course</button>
        </form>
      </fieldset>
    </div>
  );
}

export default FormTest2;
