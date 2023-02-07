import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik, FormikProvider, Field } from "formik";
import { DateTime } from "luxon";
import { bookingSchema } from "../schemas/bookingSchema";
import PropTypes from "prop-types";

function BookingEditForm({ id }) {
  BookingEditForm.propTypes = {
    id: PropTypes.string,
  };

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const [formState, setFormState] = useState({});

  const initialValues = {
    roomUseBy: "",
    createdBy: "",
    bookingStart: "",
    bookingEnd: "",
    classRoom: "",
    holiday: false,
    cohort: "",
    bookingPurpose: "",
  };

  useEffect(() => {
    // Fetch form state data from the server
    fetch(`/api/bookings/${id}`)
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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: bookingSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`/api/bookings/${id}`, {
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
        navigate("/bookings");
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
          <legend>Booking Edit Form</legend>
          <form onSubmit={formik.handleSubmit}>
            <label>
              Room Used By:
              <input
                type="text"
                name="roomUseBy"
                value={formik.values.roomUseBy}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
            </label>
            {/* If validation is not passed show errors */}
            <p className="error">
              {formik.errors.roomUseBy &&
                formik.touched.roomUseBy &&
                formik.errors.roomUseBy}
            </p>
            <br />
            <label>
              Start Date:{" "}
              <Field
                type="date"
                name="bookingStart"
                min={DateTime.now().toFormat("yyyy-MM-dd")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
            <p className="error">
              {formik.errors.bookingStart &&
                formik.touched.bookingStart &&
                formik.errors.bookingStart}
            </p>
            <br />
            <label>
              End Date:{" "}
              <Field
                type="date"
                name="bookingEnd"
                min={DateTime.now().toFormat("yyyy-MM-dd")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
            <p className="error">
              {formik.errors.bookingEnd &&
                formik.touched.bookingEnd &&
                formik.errors.bookingEnd}
            </p>
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
            <label htmlFor="holiday">Holiday: </label>
            <Field
              as="select"
              name="holiday"
              required
              onChange={formik.handleChange}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </Field>
            <p className="error">
              {formik.errors.holiday &&
                formik.touched.holiday &&
                formik.errors.holiday}
            </p>
            <br />
            <label>
              Cohort:
              <input
                type="text"
                name="cohort"
                value={formik.values.cohort}
                onChange={formik.handleChange}
              />
            </label>
            {/* If validation is not passed show errors */}
            <p className="error">
              {formik.errors.cohort &&
                formik.touched.cohort &&
                formik.errors.cohort}
            </p>
            <br />
            <label>
              Booking Purpose:
              <input
                type="text"
                name="bookingPurpose"
                value={formik.values.bookingPurpose}
                onChange={formik.handleChange}
              />
            </label>
            {/* If validation is not passed show errors */}
            <p className="error">
              {formik.errors.bookingPurpose &&
                formik.touched.bookingPurpose &&
                formik.errors.bookingPurpose}
            </p>
            <br />
            <button type="submit">Edit Booking</button>
            <p>{msg}</p>
          </form>
        </fieldset>
      </div>
    </FormikProvider>
  );
}

export default BookingEditForm;
