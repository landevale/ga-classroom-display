import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { DateTime } from "luxon";
import { bookingSchema } from "../schemas/bookingSchema";
import PropTypes from "prop-types";

function BookingForm({ setRefresh }) {
  BookingForm.propTypes = {
    setRefresh: PropTypes.func,
  };

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        roomUseBy: "",
        createdBy: "",
        bookingStart: "",
        bookingEnd: "",
        classRoom: "",
        holiday: false,
        cohort: "",
        bookingPurpose: "",
      },
      validationSchema: bookingSchema,
      onSubmit: async (values) => {
        try {
          const response = await fetch("/api/bookings", {
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
          navigate("/bookings");
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

  return (
    <div>
      <fieldset>
        <legend>Bookings Form</legend>
        <form onSubmit={handleSubmit}>
          <label>
            Room Used By:
            <input
              type="text"
              name="roomUseBy"
              value={values.roomUseBy}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </label>
          {/* If validation is not passed show errors */}
          <p className="error">
            {errors.roomUseBy && touched.roomUseBy && errors.roomUseBy}
          </p>
          <br />
          <label>
            Start Date:{" "}
            <input
              type="date"
              name="bookingStart"
              min={DateTime.now().toFormat("yyyy-MM-dd")}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          <p className="error">
            {errors.bookingStart && touched.bookingStart && errors.bookingStart}
          </p>
          <br />
          <label>
            End Date:{" "}
            <input
              type="date"
              name="bookingEnd"
              min={DateTime.now().toFormat("yyyy-MM-dd")}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          <p className="error">
            {errors.bookingEnd && touched.bookingEnd && errors.bookingEnd}
          </p>
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
          <br />
          <label htmlFor="holiday">Holiday: </label>
          <select name="holiday" required onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          <p className="error">
            {errors.holiday && touched.holiday && errors.holiday}
          </p>
          <br />
          <label>
            Cohort:
            <input
              type="text"
              name="cohort"
              value={values.cohort}
              onChange={handleChange}
            />
          </label>
          {/* If validation is not passed show errors */}
          <p className="error">
            {errors.cohort && touched.cohort && errors.cohort}
          </p>
          <br />
          <label>
            Booking Purpose:
            <input
              type="text"
              name="bookingPurpose"
              value={values.bookingPurpose}
              onChange={handleChange}
            />
          </label>
          {/* If validation is not passed show errors */}
          <p className="error">
            {errors.bookingPurpose &&
              touched.bookingPurpose &&
              errors.bookingPurpose}
          </p>
          <br />
          <button type="submit">Create Booking</button>
          <p>{msg}</p>
        </form>
      </fieldset>
    </div>
  );
}

export default BookingForm;
