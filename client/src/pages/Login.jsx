import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    user.data && navigate("/");
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),

    onChange: (values) => {
      setEmail(values.email);
      setPassword(values.password);
    },
    onSubmit: async ({ email, password }) => {
      try {
        const { data: loginData } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/login`,
          // `/auth/login`,
          {
            email,
            password,
          }
        );
        // console.log(loginData);
        // Storing JWT in local storage
        localStorage.setItem("token", loginData.data.token);
        // console.log(loginData.data.token);

        if (loginData.data) {
          // Set global user state on successful login
          setUser({
            data: {
              id: loginData.data.user.id,
              email: loginData.data.user.email,
            },
            error: null,
            loading: false,
          });
          // Update axios header with token
          axios.defaults.headers.common[
            "authorization"
          ] = `Bearer ${loginData.data.token}`;

          // On Success
          setEmail("");
          setPassword("");

          navigate("/");
        }
      } catch (error) {
        //returning of "Unauthorised"
        setErrorMsg(error.response.request.statusText);
        return errorMsg;
      }
    },
  });
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="relative block w-full appearance-none rounded-none
                  rounded-t-md border border-gray-300 px-3 py-2 text-gray-900
                  placeholder-gray-500 focus:z-10 focus:border-indigo-500
                  focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              {errorMsg && <div className=" text-red-500">{errorMsg}</div>}
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : // <div>{formik.errors.email}</div>
              null}
              <br />
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
