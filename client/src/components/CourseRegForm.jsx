import React from "react";
import { useState } from "react";
import { DateTime } from "luxon";
import DaysDropdown from "./DaysDropdown";
import ClassroomDropdown from "./ClassroomDropdown";

function CourseRegForm() {
  const [courseCode, setCourseCode] = useState("");
  const [courseSchedule, setCourseSchedule] = useState("FullTime");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [daysOnCampus, setDaysOnCampus] = useState({
    days: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
    },
  });
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [classRoom, setClassRoom] = useState("");
  const [msg, setMsg] = useState("");

  const classroomOptions = [
    { value: "1", label: "Classrooom 1" },
    { value: "2", label: "Classrooom 2" },
    { value: "3", label: "Classrooom 3" },
    { value: "4", label: "Classrooom 4" },
    { value: "5", label: "Classrooom 5" },
    { value: "6", label: "Classrooom 6" },
  ];

  const dayOptions = [
    { value: "Mon", label: "Monday" },
    { value: "Tue", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
  ];

  // More validation? Unique? Required?
  const handleCreate = async () => {
    const info = { courseCode };
    try {
      const response = await fetch("/cohorts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      setMsg("Something went wrong!");
    }
  };

  console.log(classRoom);
  return (
    <>
      <div>
        <fieldset>
          <legend>Course Registration Form</legend>
          <label>
            Course Code:{" "}
            <input
              name="courseCode"
              value={courseCode}
              onChange={(event) => console.log(event.target.value)}
            />
          </label>
          <br />
          <p>Course Type:</p>
          <label>
            <input
              type="radio"
              name="courseSchedule"
              value="FullTime"
              checked={true}
              className="form-check-input"
            />
            Full Time
          </label>
          <label>
            <input
              type="radio"
              name="courseSchedule"
              value="PartTime"
              className="form-check-input"
            />
            Part Time
          </label>
          <br />
          <br />
          <label>
            Start Date:{" "}
            <input
              type="date"
              id="start"
              min={DateTime.now().toFormat("yyyy-MM-dd")}
            />
          </label>
          <br />
          <label>
            End Date:{" "}
            <input
              type="date"
              id="start"
              min={DateTime.now().toFormat("yyyy-MM-dd")}
            />
          </label>

          <br />
          <br />
          <DaysDropdown
            isSearchable
            isMulti
            placeHolder="Days on Campus"
            dayOptions={dayOptions}
            onChange={(value) => console.log(value)}
          />
          <br />
          <br />
          <label htmlFor="startTime">Start Time: </label>

          <input
            type="time"
            id="startTime"
            name="startTime"
            min="09:00"
            max="18:00"
            required
          />
          <br />

          <label htmlFor="endTime">End Time: </label>

          <input
            type="time"
            id="endTime"
            name="endTime"
            min="09:00"
            max="18:00"
            required
          />
          <br />
          <br />
          <ClassroomDropdown
            isSearchable
            isMulti
            placeHolder="Classroom"
            classroomOptions={classroomOptions}
            onChange={(value) => setClassRoom(value)}
          />

          <br />
          <br />
          <button onClick={handleCreate}>Create</button>
        </fieldset>
        <p>{msg}</p>
      </div>
    </>
  );
}

export default CourseRegForm;
