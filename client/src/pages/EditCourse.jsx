import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
// import DaysDropdown from "../components/DaysDropdown";
// import ClassroomDropdown from "../ClassroomDropdown";
// import { DataContext } from "../App";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(`/cohorts/${id}`);
      const data = await response.json();
      console.log(data);
      setFormState(data);
    };
    fetchCourse();
  }, [id]);

  function handleChange(evt) {
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
  }
  useEffect(() => {
    console.log(formState);
  }, [formState]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formInfo = Object.fromEntries(formData);

    // console.log("formInfo %o", formInfo);
    // if (formInfo.celebrated === "on") {
    //   formInfo.celebrated = true;
    // } else {
    //   formInfo.celebrated = false;
    // }
    // console.log("after %o", formInfo);

    console.log(id);
    const response = await fetch(`/cohorts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInfo),
    });
    const data = await response.json();
    console.log(data);

    navigate("/courses");
  };

  const logger = () => {
    console.log(formState);
    
  }
  return (
    <>
      <h1>Edit Course {id}</h1>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Edit Course</legend>
          <label>
            Course:{" "}
            <input
              type="text"
              name="courseCode"
              defaultValue={formState.courseCode}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <p>Course Type:</p>
          <label>
            Full Time
            <input
              type="radio"
              name="courseSchedule"
              value="FullTime"
              checked={formState.courseSchedule === "FullTime"}
              onChange={handleChange}
            />
          </label>
          <label>
            Part Time
            <input
              type="radio"
              name="courseSchedule"
              value="PartTime"
              checked={formState.courseSchedule === "PartTime"}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />

          <label>
            Start Date:{" "}
            <input
              type="date"
              id="start"
              name="startDate"
              defaultValue={formState.startDate}
              min={DateTime.now().toFormat("yyyy-MM-dd")}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            End Date:{" "}
            <input
              type="date"
              id="end"
              name="endDate"
              defaultValue={formState.endDate}
              min={DateTime.now().toFormat("yyyy-MM-dd")}
              onChange={handleChange}
            />
          </label>

          <br />
          <br />

          <label htmlFor="altSaturdays">Saturdays: </label>
          <select
            name="altSaturdays"
            value={formState.altSaturdays}
            defaultValue={formState.altSaturdays}
            onChange={handleChange}
          >
            <option value="none">None</option>
            <option value="odd">Odd - 1st Week</option>
            <option value="even">Even - 2nd Week</option>
            <option value="all">All</option>
          </select>
          {/* <br />
          <br />
          <DaysDropdown
            isSearchable
            isMulti
            placeHolder="Days on Campus"
            dayOptions={dayOptions}
            onChange={(value) => setDaysOnCampus(value)}
          /> */}
          <br />
          <br />
          <label htmlFor="startTime">Start Time: </label>

          <input
            type="time"
            name="startTime"
            min="09:00"
            max="18:00"
            value={formState.startTime}
            required
            onChange={handleChange}
          />
          <br />

          <label htmlFor="endTime">End Time: </label>

          <input
            type="time"
            name="endTime"
            min="09:00"
            max="18:00"
            value={formState.endTime}
            required
            onChange={handleChange}
          />

          <br />
          <br />
          <label>
            Weeks:{" "}
            <input
              type="number"
              name="weeks"
              min="1"
              max="99"
              defaultValue={formState.weeks}
              onChange={handleChange}
            />
          </label>
          {/* DELETE THIS WHEN DONE; FOR CONSOLE LOGGINGS etc */}
          <br />
          <br />
          <button onClick={logger()}>Log</button>
          {/* DELETE THIS WHEN DONE; FOR CONSOLE LOGGINGS etc */}
        </fieldset>
        <button>Update</button>
        <button type="reset">Reset</button>
      </form>
    </>
  );
}

export default EditCourse;
