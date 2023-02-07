import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { DateTime } from "luxon";
import { bookingSchema } from "../schemas/bookingSchema";
import axios from "axios";

export default function BookingsRegForm() {
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
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/bookings`,
            //   `/api/cohorts`,
            values
          );
          console.log("successfully POST");
          navigate("/admin/bookings");
        } catch (error) {
          console.log(values);
          setMsg("Something went wrong!");

          //   const response = await fetch("/api/bookings", {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify(values),
          //   });
          //   if (!response.ok) {
          //     throw new Error("Network response was not OK");
          //   }
          //   const data = await response.json();
          //   console.log(data);
          //   setRefresh(true);
          //   navigate("/bookings");
          // } catch (error) {
          //   console.log(values);
          //   setMsg("Something went wrong!");
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
    <div className="space-y-8">
      <div>
        <div>
          <h3 className="text-3xl font-medium leading-6 text-gray-900">
            Bookings Form
          </h3>
        </div>
      </div>
      <fieldset>
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Bookings Information
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700">
            Room Used By:
            <input
              type="text"
              name="roomUseBy"
              value={values.roomUseBy}
              onChange={handleChange}
              onBlur={handleBlur}
              className="ml-2 rounded-md bg-slate-200 border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
              className="rounded-md bg-slate-200"
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
              className="rounded-md bg-slate-200"
            />
          </label>
          <p className="error">
            {errors.bookingEnd && touched.bookingEnd && errors.bookingEnd}
          </p>
          <br />
          <label htmlFor="classRoom">Classroom: </label>
          <select
            name="classRoom"
            onChange={handleChange}
            className="bg-slate-200 rounded-md"
          >
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
          <select
            name="holiday"
            required
            onChange={handleChange}
            className="bg-slate-200 rounded-md"
          >
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
              className="ml-2  rounded-md bg-slate-200 border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
              className="ml-2  rounded-md bg-slate-200 border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </label>
          {/* If validation is not passed show errors */}
          <p className="error">
            {errors.bookingPurpose &&
              touched.bookingPurpose &&
              errors.bookingPurpose}
          </p>
          <br />
          <div className="pt-5 pb-20">
            <div>
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => resetForm()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create Booking
              </button>
              <p>{msg}</p>
            </div>
          </div>
        </form>
      </fieldset>
    </div>
  );
}
