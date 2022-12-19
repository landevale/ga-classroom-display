import React from "react";
import { useState } from "react";
import { DateTime } from "luxon";
import ClassroomDropdown from "../components/ClassroomDropdown";

function Bookings() {
  const [roomUseBy, setRoomUseBy] = useState("");
  const [bookingStart, setBookingStart] = useState("");
  const [bookingEnd, setBookingEnd] = useState("");
  const [classRoom, setClassRoom] = useState("");
  const [holiday, setHoliday] = useState("No");
  const [bookingPurpose, setBookingPurpose] = useState("");
  const [msg, setMsg] = useState("");
  const [cohort, setCohort] = useState("");
  const [errors, setErrors] = useState({});
  const [createdBy, setCreatedBy] = useState("");

  const classroomOptions = [
    { value: "1", label: "Classrooom 1" },
    { value: "2", label: "Classrooom 2" },
    { value: "3", label: "Classrooom 3" },
    { value: "4", label: "Classrooom 4" },
    { value: "5", label: "Classrooom 5" },
    { value: "6", label: "Classrooom 6" },
  ];

  const holidayOptions = ["No", "Yes"];

  const validate = () => {
    let tempErrors = {};
    if (!createdBy) {
      tempErrors.name = "Created By required";
      setErrors(tempErrors);
      setMsg(tempErrors.name);
    }
    if (!holiday) {
      tempErrors.name = "Holiday status required";
      setErrors(tempErrors);
      setMsg(tempErrors.name);
    }
    if (!bookingEnd) {
      tempErrors.name = "End date required";
      setErrors(tempErrors);
      setMsg(tempErrors.name);
    }
    if (!bookingStart) {
      tempErrors.name = "Start date required";
      setErrors(tempErrors);
      setMsg(tempErrors.name);
    }
    if (!roomUseBy) {
      tempErrors.name = "Use By required";
      setErrors(tempErrors);
      setMsg(tempErrors.name);
    }
    // setErrors(tempErrors);
    // setMsg(tempErrors.name);
    return Object.keys(tempErrors).length === 0;
  };

  const handleCreate = async () => {
    if (validate()) {
      const info = {
        roomUseBy,
        bookingStart,
        bookingEnd,
        classRoom,
        holiday,
        bookingPurpose,
        createdBy,
      };

      try {
        const response = await fetch("/bookings", {
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
        console.log(info);
        setMsg("Something went wrong!");
      }
    }
  };

  return (
    <>
      <div>
        <h1>Bookings</h1>
      </div>
      <div>
        <fieldset>
          <legend>Manual Booking Form</legend>
          <label>
            Room used by *:
            <input
              type="text"
              placeholder="Required"
              name="roomUseBy"
              value={roomUseBy}
              onChange={(e) => setRoomUseBy(e.target.value)}
              required
            />
          </label>
          <br />
          <br />
          <label>
            Start Date *:{" "}
            <input
              type="date"
              id="start"
              min={DateTime.now().toFormat("yyyy-MM-dd")}
              //==================
              //This confirms that when user is in Singapore, the input time is GMT+8, contrary to seeded data
              required
              onChange={
                (e) =>
                  // (e) => console.log(typeof e.target.value)
                  setBookingStart(DateTime.fromISO(e.target.value).toISO())
                // )
              }
            />
          </label>
          <br />
          <label>
            End Date *:{" "}
            <input
              type="date"
              id="end"
              min={DateTime.now().toFormat("yyyy-MM-dd")}
              required
              //==================
              //This confirms that when user is in Singapore, the input time is GMT+8, contrary to seeded data
              onChange={
                (e) => setBookingEnd(DateTime.fromISO(e.target.value).toISO())
                // setEndDate(
                //   DateTime.fromISO(e.target.value).toLocaleString(
                //     DateTime.DATETIME_FULL
                //====================
              }
            />
          </label>

          <br />
          <br />

          {/* <label htmlFor="startTime">Start Time: </label>

          <input
            type="time"
            id="startTime"
            name="startTime"
            min="09:00"
            max="18:00"
            value={startTime}
            required
            onChange={(e) => setStartTime(e.target.value)}
          />
          <br />

          <label htmlFor="endTime">End Time: </label>

          <input
            type="time"
            id="endTime"
            name="endTime"
            min="09:00"
            max="18:00"
            value={endTime}
            required
            onChange={(e) => setEndTime(e.target.value)}
          />

          <br />
          <br /> */}
          <ClassroomDropdown
            placeHolder="Classroom"
            classroomOptions={classroomOptions}
            onChange={(value) => setClassRoom(value.value)}
          />
          <br />
          <br />

          <label htmlFor="holiday">Holiday *: </label>
          <select
            name="holiday"
            defaultvalue={holiday}
            required
            onChange={(e) => setHoliday(e.target.value)}
          >
            {holidayOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <br />
          <br />
          <label>
            Cohort:
            <input
              type="cohort"
              name="cohort"
              value={cohort}
              onChange={(e) => setCohort(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            Comments:
            <input
              type="bookingPurpose"
              name="bookingPurpose"
              value={bookingPurpose}
              onChange={(e) => setBookingPurpose(e.target.value)}
            />
          </label>
          <br />
          <label>
            Created by *:
            <input
              type="createdBy"
              name="createdBy"
              value={createdBy}
              required
              onChange={(e) => setCreatedBy(e.target.value)}
            />
          </label>
          <br />
          <br />
          <button onClick={handleCreate}>Create Booking</button>
        </fieldset>
        <p>{msg}</p>
      </div>
    </>
  );
}

export default Bookings;
