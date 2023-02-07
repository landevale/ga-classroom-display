import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { DateTime } from "luxon";
import { courseRegSchema } from "../../schemas/courseRegSchema";
import axios from "axios";

export default function CourseRegForm() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
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
        console.log(values)
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/cohorts`,
        //   `/api/cohorts`,
          values
        );
        console.log("successfully POST")
        // navigate("/courses");
        //=====================
        //   const response = await fetch("/api/cohorts", {
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
        //======================
        //   console.log(data);
        //   setRefresh(true);
        //   navigate("/courses");
      } catch (error) {
        // console.log(values);
        setMsg("Something went wrong!");
      }
    },
  });

  //   console.log(values);
  console.log("Errors", errors);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 divide-y divide-gray-200"
      >
        <div className="space-y-8">
          <div>
            <div>
              <h3 className="text-3xl font-medium leading-6 text-gray-900">
                Course Registration Form
              </h3>
            </div>
          </div>

          <div className="">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Course Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Kindly fill in/select all fields.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-1">
                <label
                  htmlFor="courseCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course Code:
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="courseCode"
                    value={values.courseCode}
                    className="block w-full rounded-md bg-slate-200 border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </div>
              </div>
              {/* If validation is not passed show errors */}
              <p className="error">
                {errors.courseCode && touched.courseCode && errors.courseCode}
              </p>
            </div>
          </div>

          <div className="">
            <div className="border p-4">
              <label className="text-base font-normal text-gray-800">
                Course Type
              </label>

              <fieldset className="mt-4">
                <legend className="sr-only">Course Type</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  <div className="flex items-center">
                    <input
                      name="courseSchedule"
                      type="radio"
                      value="FullTime"
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label className="ml-3 pr-4 mr-4 block text-sm font-medium text-gray-700">
                      Full Time
                    </label>

                    <input
                      name="courseSchedule"
                      type="radio"
                      value="PartTime"
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      Part Time
                    </label>
                  </div>
                </div>
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
                  className="rounded-md bg-slate-200"
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
                  className="rounded-md bg-slate-200"
                />
              </label>
              <p className="error">
                {errors.endDate && touched.endDate && errors.endDate}
              </p>
            </div>
            <br />
            <br />
            <div className="border p-4">
              <label className="text-base font-medium text-gray-900">
                Days on Campus
              </label>

              <fieldset className="mt-4">
                <legend className="sr-only">Notification method</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  <div className="flex items-center">
                    <input
                      name="daysOnCampus.monday"
                      type="checkbox"
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      Monday
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      name="daysOnCampus.tuesday"
                      type="checkbox"
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      Tuesday
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      name="daysOnCampus.wednesday"
                      type="checkbox"
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      Wednesday
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      name="daysOnCampus.thursday"
                      type="checkbox"
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      Thursday
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      name="daysOnCampus.friday"
                      type="checkbox"
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      Friday
                    </label>
                  </div>
                  <br />
                </div>
                <div className="pt-4">
                  <label htmlFor="altSaturdays">Saturdays: </label>
                  <select
                    name="altSaturdays"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="bg-slate-200 rounded-md"
                  >
                    <option value="none">None</option>
                    <option value="odd">Odd</option>
                    <option value="even">Even</option>
                    <option value="all">All</option>
                  </select>
                </div>
              </fieldset>
            </div>
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
              className="rounded-md bg-slate-200"
            />
            <br />
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
              className="rounded-md bg-slate-200"
            />

            <br />
            <br />
            <br />
            <label htmlFor="classRoom">Classroom: </label>
            <select
              name="classRoom"
              className="bg-slate-200 rounded-md"
              onChange={handleChange}
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
          </div>
        </div>

        <div className="pt-5 pb-20">
          <div className="flex">
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
              Create Course
            </button>
            <p>{msg}</p>
          </div>
        </div>
      </form>
    </>
  );
}
