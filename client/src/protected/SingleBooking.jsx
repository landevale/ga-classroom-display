import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link as NavLink } from "react-router-dom";
import { useFormik, FormikProvider, Field } from "formik";
import { DateTime } from "luxon";
import { bookingSchema } from "../schemas/bookingSchema";
import axios from "axios";

export default function SingleBooking() {
  const [msg, setMsg] = useState("");
  const { id } = useParams();
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

  const fetchForm = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/bookings/${id}`
        // `/api/cohorts/${id}`
      );
      setFormState(response.data);
      formik.setValues(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchForm();
  }, [id]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: bookingSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_BASE_URL}/api/bookings/${id}`,
          values
        );

        console.log("PUT SUCCESS");
        navigate("/admin/bookings");
      } catch (error) {
        console.log(error);
        // setMsg("Something went wrong!");
      }
    },
  });

  return (
    <div className="px-4 pb-4 mb-10 mt-4 sm:px-6 lg:px-8">
      <div className="pt-4 px-4 border">
        <div className="space-y-8">
          <FormikProvider value={formik}>
            <div className="space-y-8">
              <div>
                <div>
                  <h3 className="text-3xl font-medium leading-6 text-gray-900">
                    Booking Edit Form
                  </h3>
                </div>
              </div>
              <fieldset>
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Bookings Information
                  </h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <label className="block text-sm font-medium text-gray-700">
                    Room Used By:
                    <input
                      type="text"
                      name="roomUseBy"
                      value={formik.values.roomUseBy}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="ml-2 rounded-md bg-slate-200 border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      className="rounded-md bg-slate-200"
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
                      className="rounded-md bg-slate-200"
                    />
                  </label>
                  <p className="error">
                    {formik.errors.bookingEnd &&
                      formik.touched.bookingEnd &&
                      formik.errors.bookingEnd}
                  </p>
                  <br />
                  <label htmlFor="classRoom">Classroom: </label>
                  <Field
                    as="select"
                    name="classRoom"
                    onChange={formik.handleChange}
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
                  </Field>
                  <br />
                  <br />
                  <label htmlFor="holiday">Holiday: </label>
                  <Field
                    as="select"
                    name="holiday"
                    required
                    onChange={formik.handleChange}
                    className="bg-slate-200 rounded-md"
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
                      className="ml-2  rounded-md bg-slate-200 border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      className="ml-2  rounded-md bg-slate-200 border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </label>
                  {/* If validation is not passed show errors */}
                  <p className="error">
                    {formik.errors.bookingPurpose &&
                      formik.touched.bookingPurpose &&
                      formik.errors.bookingPurpose}
                  </p>
                  <br />
                  <div className="pt-5 pb-20">
                    <div>
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <NavLink to="/admin/bookings">Cancel</NavLink>
                      </button>
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Edit Booking
                      </button>
                      <p>{msg}</p>
                    </div>
                  </div>
                </form>
              </fieldset>
            </div>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
}
