import React from "react";
import { Formik, Form, Field } from "formik";

const FormTest3 = () => {
  return (
    <Formik
      initialValues={{
        options: {
          option1: false,
          option2: true,
          option3: false,
        },
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {() => (
        <Form>
          <Field name="options.option1" type="checkbox" /> Option 1
          <Field name="options.option2" type="checkbox" /> Option 2
          <Field name="options.option3" type="checkbox" /> Option 3
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormTest3;
