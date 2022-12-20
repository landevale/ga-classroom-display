import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { DataContext } from "../App";
// import LoginForm from "../components/LoginForm";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [userId, setUserId] = useState("");

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const handleLogin = async (info) => {
    console.log(info);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    console.log("Response", response);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setUserId(data.user._id);
      setUser(data.user.username);
      setMsg("Login successful");
      navigate("/");
    } else {
      setMsg("Invalid login");
    }
  };

  useEffect(() => {
    console.log(msg);
  }, [msg]);

  useEffect(() => {
    console.log(userId);
  }, [userId]);

  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        // onSubmit={(values) => {
        //   // Alert the input values of the form that we filled
        //   alert(JSON.stringify(values));
        // }}
        onSubmit={handleLogin}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login">
            <div className="form">
              <fieldset>
                <legend>LOG IN</legend>
                {/* Passing handleSubmit parameter tohtml form onSubmit property */}
                <form noValidate onSubmit={handleSubmit}>
                  {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                  <label>
                    Email:{" "}
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter email"
                      className="form-control inp_text"
                      id="email"
                    />
                  </label>
                  {/* If validation is not passed show errors */}
                  <p className="error">
                    {errors.email && touched.email && errors.email}
                  </p>
                  {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                  <label>
                    Password:{" "}
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter password"
                      className="form-control"
                    />
                  </label>
                  {/* If validation is not passed show errors */}
                  <p className="error">
                    {errors.password && touched.password && errors.password}
                  </p>
                  {/* Click on submit button to submit the form */}
                  <button type="submit">Login</button>
                </form>
                <p>{msg}</p>
              </fieldset>
            </div>
          </div>
        )}
      </Formik>
      {/* <div>
        <fieldset>
          <legend>LOG IN</legend>
          <label>
            Username: <input name="username" />
          </label>
          {"   "}
          <label>
            Password: <input name="password" />
          </label>
          <button onClick={handleLogin}>Log In</button>
          <LoginForm />
        </fieldset>
      </div> */}
    </>
  );
}

export default Login;
