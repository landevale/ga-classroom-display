import React from "react";
import { Formik, Field, Form } from "formik";

function FormTest() {
  const handleSubmit = (values) => {
    // Perform logic for handling form submission
    console.log(values);
    console.log(typeof values.booleanOption);
  };

  //   console.log(values);

  return (
    <Formik
      initialValues={{
        booleanOption: true,
        multipleOptions: { option1: false, option2: false, option3: false },
        textInput: "",
        checkboxOption: false,
      }}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form>
          <fieldset>
            <legend>Test Form</legend>
            <Field name="booleanOption">
              {({ field }) => (
                <select {...field}>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              )}
            </Field>
            <Field name="multipleOptions">
              {({ field }) => (
                <select {...field} multiple>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              )}
            </Field>
            <Field name="textInput">
              {({ field }) => (
                <input type="text" {...field} onChange={handleChange} />
              )}
            </Field>
            <Field name="checkboxOption">
              {({ field }) => <input type="checkbox" {...field} />}
            </Field>
            <button type="submit">Submit</button>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
}

export default FormTest;
