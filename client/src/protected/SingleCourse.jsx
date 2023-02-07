import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link as NavLink } from "react-router-dom";
import { useFormik, Field, FormikProvider } from "formik";
import { DateTime } from "luxon";
import { courseEditSchema } from "../schemas/courseEditSchema";
import axios from "axios";

//Under ProtectRoute
export default function SingleCourse() {
  const [msg, setMsg] = useState("");
  const { id } = useParams();
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

  const fetchForm = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/cohorts/${id}`
        // `/api/cohorts/${id}`
      );
      // console.log(response.data);
      // console.log(typeof response.data.active);
      // console.log(response.data.active)
      //   if(response.data.active === true){
      //       console.log(activeState)
      //   } else {
      //     setActiveState(false);
      //     console.log(activeState)

      //   }
      setFormState(response.data);
      formik.setValues(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchForm();
  }, [id]);

  useEffect(() => {
    console.log("Formstate", formState);
  }, [formState]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: courseEditSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_BASE_URL}/api/cohorts/${id}`,
          values
        );
        // if (!response.ok) {
        //   throw new Error("Network response was not OK");
        // }

        console.log("PUT SUCCESS");
        // navigate("/courses");
      } catch (error) {
        console.log(error);
        // setMsg("Something went wrong!");
      }
    },
  });

  console.log("Values", formik.values);
  // console.log("Errors", formik.errors);
  return (
    <div className="px-4 mt-4 sm:px-6 lg:px-8">
      <div className="pt-4 px-4 border">
        <FormikProvider value={formik}>
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-8 divide-y divide-gray-200"
          >
            <div className="space-y-8">
              <div>
                <div>
                  <h3 className="text-3xl font-medium leading-6 text-gray-900">
                    Course Edit Form
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
                        value={formik.values.courseCode}
                        className="block w-full rounded-md bg-slate-200 border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                    </div>
                  </div>
                  {/* If validation is not passed show errors */}
                  <p className="error">
                    {formik.errors.courseCode &&
                      formik.touched.courseCode &&
                      formik.errors.courseCode}
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
                        <Field
                          name="courseSchedule"
                          type="radio"
                          value="FullTime"
                          onChange={formik.handleChange}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label className="ml-3 pr-4 mr-4 block text-sm font-medium text-gray-700">
                          Full Time
                        </label>

                        <Field
                          name="courseSchedule"
                          type="radio"
                          value="PartTime"
                          onChange={formik.handleChange}
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
                    <Field
                      type="date"
                      name="startDate"
                      max={DateTime.now().toFormat("yyyy-MM-dd")}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="rounded-md bg-slate-200"
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
                      className="rounded-md bg-slate-200"
                    />
                  </label>
                  <p className="error">
                    {formik.errors.endDate &&
                      formik.touched.endDate &&
                      formik.errors.endDate}
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
                        <Field
                          name="daysOnCampus.monday"
                          type="checkbox"
                          onChange={formik.handleChange}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label className="ml-3 block text-sm font-medium text-gray-700">
                          Monday
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Field
                          name="daysOnCampus.tuesday"
                          type="checkbox"
                          onChange={formik.handleChange}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label className="ml-3 block text-sm font-medium text-gray-700">
                          Tuesday
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Field
                          name="daysOnCampus.wednesday"
                          type="checkbox"
                          onChange={formik.handleChange}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label className="ml-3 block text-sm font-medium text-gray-700">
                          Wednesday
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Field
                          name="daysOnCampus.thursday"
                          type="checkbox"
                          onChange={formik.handleChange}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label className="ml-3 block text-sm font-medium text-gray-700">
                          Thursday
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Field
                          name="daysOnCampus.friday"
                          type="checkbox"
                          onChange={formik.handleChange}
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
                      <Field
                        as="select"
                        name="altSaturdays"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-slate-200 rounded-md"
                      >
                        <option value="none">None</option>
                        <option value="odd">Odd</option>
                        <option value="even">Even</option>
                        <option value="all">All</option>
                      </Field>
                    </div>
                  </fieldset>
                </div>
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
                  className="rounded-md bg-slate-200"
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
                  className="rounded-md bg-slate-200"
                />

                <br />
                <br />
                <br />
                <label htmlFor="classRoom">Classroom: </label>
                <Field
                  as="select"
                  name="classRoom"
                  className="bg-slate-200 rounded-md"
                  onChange={formik.handleChange}
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
              </div>
            </div>

            <div className="pt-5 pb-20">
              <div className="flex">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <NavLink to="/courses">Cancel</NavLink>
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Edit Course
                </button>
                <p>{msg}</p>
              </div>
            </div>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
}
