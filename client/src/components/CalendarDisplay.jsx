import React, { useState, useEffect } from "react";
import { DateTime, Interval } from "luxon";

function CalendarDisplay({ selectedDateState }) {
  // Array to display based on day selected
  const dayDisplayArr = [];

  for (let i = 0; i < 7; i++) {
    dayDisplayArr.push(
      DateTime.fromFormat(selectedDateState, "ccc, d LLL y")
        .plus({ days: i })
        .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
    );
  }

  //need to filter by date, then by class. with that info, push data into array with IF-sun logic and map out
  const [bookingsState, setBookingState] = useState([]);

  useEffect(() => {
    fetch("/bookings/")
      .then((response) => response.json())
      .then((data) => setBookingState(data));
  }, []);
  //======================================
  //logic to map out 7 cells with key+value for each cell
  //======================
  //selectedDateStateISO will give an ISO (e.g 25 Dec 2022, becomes 2022-12-25)
  const selectedDateStateISO = DateTime.fromFormat(
    selectedDateState.slice(5),
    "d MMM yyyy"
  ).toISODate();

  //Math for pushing into array, "7" consecutive days. Gives, [1,2,3,4,5,6,7] if selected 1st of month
  const daysToShow = 7;
  const selectedDateTableArray = [];
  for (let i = 0; i < daysToShow; i++) {
    selectedDateTableArray.push(
      DateTime.fromISO(selectedDateStateISO).plus({ days: i }).toISODate()
      // .slice(-2)
    );
  }

  console.log("selectedDateTableArray = ", selectedDateTableArray);
  //============================
  //Mapping the calendar cells
  //================
  const classroomSixTableMap = selectedDateTableArray.map((ele) => (
    <td key={`6-${ele}`} value={`6${ele}`}>
      {`6-${ele}`}
    </td>
  ));

  const startDate = bookingsState;
  console.log(startDate);
  console.log(startDate[0]?.bookingStart);
  const startDateDt = DateTime.fromISO(startDate[0]?.bookingStart);
  console.log(startDateDt);

  const endDate = bookingsState;
  console.log(endDate);
  console.log(endDate[0]?.bookingEnd);
  const endDateDt = DateTime.fromISO(endDate[0]?.bookingEnd);
  console.log(endDateDt);

  const intervals = Interval.fromDateTimes(
    startDateDt,
    endDateDt.plus({ days: 1 })
  )
    .splitBy({ day: 1 })
    .map((d) => d.start);

  console.log(intervals);

  return (
    <table className="table" border="solid">
      <tr className="table__row table__row--header">
        <th
          scope="colgroup"
          colSpan="15"
          className="table__cell--header table__cell--level table__cell--align-left"
        >
          Timetable
        </th>
      </tr>
      <tr className="table__row table__row--subheader">
        <th scope="col" className="table__cell--header table__cell--align-left">
          Classroom
        </th>
        {dayDisplayArr.map((ele, i) => (
          <th scope="col" className="table__cell--header" key={i}>
            {ele}
          </th>
        ))}
      </tr>
      <tr>
        <td>Classroom 1</td>
        <td style={{ backgroundColor: "grey" }}></td>
        <td>SEI-40</td>
        <td>SEI-40</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>

      <tr>
        <td>Classroom 2</td>
        <td style={{ backgroundColor: "grey" }}></td>
        <td></td>
        <td></td>
        <td>UXDI41</td>
        <td>UXDI41</td>
        <td></td>
        <td></td>
      </tr>

      <tr>
        <td>Classroom 3</td>
        <td style={{ backgroundColor: "grey" }}></td>
        <td>SEI-41</td>
        <td>SEI-41</td>
        <td>SEI-41</td>
        <td>SEI-41</td>
        <td></td>
        <td></td>
      </tr>

      <tr>
        <td>Classroom 4</td>
        <td style={{ backgroundColor: "grey" }}></td>
        <td>DSI-34</td>
        <td>DSI-34</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>

      <tr>
        <td>Classroom 5</td>
        <td style={{ backgroundColor: "grey" }}></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>DSIFX-09</td>
      </tr>

      <tr>
        <td>Classroom 6</td>
        {classroomSixTableMap}
      </tr>
    </table>
  );
}

export default CalendarDisplay;
