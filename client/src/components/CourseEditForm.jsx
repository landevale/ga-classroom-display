import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik, Field, FormikProvider } from "formik";
import { DateTime } from "luxon";
import { courseRegSchema } from "../schemas/courseRegSchema";
import PropTypes from "prop-types";

function CourseEditForm({ id }) {
  CourseEditForm.propTypes = {
    id: PropTypes.string,
  };

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const [formState, setFormState] = useState({});

  const initialValues = {
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
    altSaturdays: "",
    startTime: "",
    endTime: "",
    classRoom: "",
  };

  // useEffect(() => {
  //   const fetchCourse = async () => {
  //     const response = await fetch(`/api/cohorts/${id}`);
  //     const data = await response.json();
  //     console.log("From effect", data);
  //     setFormState(data);
  //   };
  //   fetchCourse();
  // }, [id]);

  useEffect(() => {
    // Fetch form state data from the server
    fetch(`/api/cohorts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormState(data);
        // initialValues = data;
        formik.setValues(data);
      });
  }, [id]);

  useEffect(() => {
    console.log("Formstate", formState);
  }, [formState]);

  // const {
  //   values,
  //   errors,
  //   touched,
  //   handleChange,
  //   handleBlur,
  //   handleSubmit,
  //   setValues,
  // }
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: courseRegSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`/api/cohorts/${id}`, {
          method: "PUT",
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
        navigate("/courses");
      } catch (error) {
        console.log(values);
        setMsg("Something went wrong!");
      }
    },
  });

  console.log("Values", formik.values);
  console.log("Errors", formik.errors);

  return (
    <FormikProvider value={formik}>
      <div>
        <fieldset>
          <legend>Course Edit Form</legend>
          <form onSubmit={formik.handleSubmit}>
            <label>
              Course Code:
              <input
                type="text"
                name="courseCode"
                value={formik.values.courseCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
            </label>
            {/* If validation is not passed show errors */}
            <p className="error">
              {formik.errors.courseCode &&
                formik.touched.courseCode &&
                formik.errors.courseCode}
            </p>
            <br />
            <fieldset>
              <legend>Course Type:</legend>

              <label>
                <Field
                  type="radio"
                  name="courseSchedule"
                  value="FullTime"
                  className="form-check-input"
                  onChange={formik.handleChange}
                />
                Full Time
              </label>
              <label>
                <Field
                  type="radio"
                  name="courseSchedule"
                  value="PartTime"
                  className="form-check-input"
                  onChange={formik.handleChange}
                />
                Part Time
              </label>
              {/* If validation is not passed show errors */}
              <p className="error">
                {formik.errors.courseSchedule &&
                  formik.touched.courseSchedule &&
                  formik.errors.courseSchedule}
              </p>
            </fieldset>
            <br />
            <br />
            <label>
              Start Date:{" "}
              <Field
                type="date"
                name="startDate"
                min={DateTime.now().toFormat("yyyy-MM-dd")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
            <p className="error">
              {formik.errors.startDate &&
                formik.touched.startDate &&
                formik.errors.startDate}
            </p>
            <br />
            <label>
              End Date:{" "}
              <Field
                type="date"
                name="endDate"
                min={DateTime.now().toFormat("yyyy-MM-dd")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
            <p className="error">
              {formik.errors.endDate &&
                formik.touched.endDate &&
                formik.errors.endDate}
            </p>
            <fieldset>
              <legend>Days on Campus:</legend>
              <Field
                name="daysOnCampus.monday"
                type="checkbox"
                onChange={formik.handleChange}
              />{" "}
              Monday
              <Field
                name="daysOnCampus.tuesday"
                type="checkbox"
                onChange={formik.handleChange}
              />{" "}
              Tuesday
              <Field
                name="daysOnCampus.wednesday"
                type="checkbox"
                onChange={formik.handleChange}
              />{" "}
              Wednesday
              <Field
                name="daysOnCampus.thursday"
                type="checkbox"
                onChange={formik.handleChange}
              />{" "}
              Thursday
              <Field
                name="daysOnCampus.friday"
                type="checkbox"
                onChange={formik.handleChange}
              />{" "}
              Friday
              <br />
              <label htmlFor="altSaturdays">Saturdays: </label>
              <Field
                as="select"
                name="altSaturdays"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="none">None</option>
                <option value="odd">Odd</option>
                <option value="even">Even</option>
                <option value="all">All</option>
              </Field>
            </fieldset>

            <br />
            <br />
            <label htmlFor="startTime">Start Time: </label>
            <Field
              type="time"
              id="startTime"
              name="startTime"
              min="09:00"
              max="18:00"
              value={formik.values.startTime}
              onChange={formik.handleChange}
            />
            <br />
            <br />
            <label htmlFor="endTime">End Time: </label>
            <Field
              type="time"
              id="endTime"
              name="endTime"
              min="09:00"
              max="18:00"
              value={formik.values.endTime}
              onChange={formik.handleChange}
            />
            <br />
            <br />
            <label htmlFor="classRoom">Classroom: </label>
            <Field as="select" name="classRoom" onChange={formik.handleChange}>
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
            </Field>
            <br />

            <br />
            <button type="submit">Edit Course</button>
            <p>{msg}</p>
          </form>
        </fieldset>
      </div>
    </FormikProvider>
  );
}

export default CourseEditForm;
