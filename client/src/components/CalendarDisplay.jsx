import React, { useState, useEffect } from "react";
import { DateTime, Interval } from "luxon";
import PropTypes from "prop-types";

function CalendarDisplay({ selectedDateState }) {
  // Prop validaton
  CalendarDisplay.propTypes = {
    selectedDateState: PropTypes.string,
  };

  //==============================
  //Fetching Data json and set state for Data into sookingState
  const [bookingsState, setBookingsState] = useState([]);
  useEffect(() => {
    fetch("/bookings/")
      // fetch("localhost:3000/bookings")
      .then((response) => response.json())
      .then((data) => setBookingsState(data));
  }, []);

  console.log("BOOKINGSSTATE", bookingsState);

  //Changing selectedDateState to working ISO date
  const selectedISODate = DateTime.fromFormat(
    selectedDateState.slice(5),
    "d MMM yyyy"
  ).toISO();
  console.log("selectedISODate", selectedISODate);

  //===========================================================
  const daysToShow = 7; //EDIT DAYS TO SHOW IN CALENDAR HERE
  //===========================================================
  // Array to display based on day selected
  const dayDisplayArr = [];

  const selectedDateTableArray = [];

  //need to filter by date, then by class. with that info, push data into array with IF-sun logic and map out

  //==========================================
  // Logic for creating empty array (to be appended later) then mapped onto table

  //===========================================================
  const numberOfClassRooms = 6; //EDIT Number of Classrooms HERE
  //===========================================================
  const occupiedBy = [];
  for (let i = 0; i < numberOfClassRooms; i++) {
    occupiedBy.push([]);
    for (let j = 0; j < daysToShow; j++) {
      occupiedBy[i].push("");
    }
  }

  //==========================================
  // Logic for looping through ALL bookings (change to looping throuogh all cohort later=> and then looping through bookings to overwrite)
  for (let i = 0; i < bookingsState.length; i++) {
    let currDate = "";
    let currBookingStartDate = "";
    let currBookingEndDate = "";
    for (let j = 0; j < daysToShow; j++) {
      currDate = new Date(selectedDateState);
      // console.log("SELECTEDISODATE2", selectedISODate);
      currDate = new Date(
        DateTime.fromISO(selectedISODate).plus({ days: j }).toISO()
      );
      // console.log("CURRDATE", currDate);
      currBookingStartDate = new Date(bookingsState[i].bookingStart);
      currBookingEndDate = new Date(bookingsState[i].bookingEnd);
      // console.log(typeof currBookingEndDate)
      // console.log(
      //   "ALLDATES",
      //   currBookingStartDate,
      //   currBookingEndDate,
      //   currDate
      // );
      if (currBookingStartDate <= currDate && currBookingEndDate >= currDate)
        occupiedBy[bookingsState[i].classRoom - 1][j] =
          bookingsState[i].roomUseBy;
    }
  }

  //=============================
  //Overwriting with Sundays
  const selectedDateStateISO = DateTime.fromFormat(
    selectedDateState.slice(5),
    "d MMM yyyy"
  ).toISODate();

  const weekDayArray = [];
  const sundayArray = [];
  for (let i = 0; i < daysToShow; i++) {
    weekDayArray.push(
      DateTime.fromFormat(selectedDateState, "ccc, d LLL y")
        .plus({ days: i })
        .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
        .slice(0, 3)
    );
    // sundayArray.push(
    //   DateTime.fromISO(selectedDateStateISO)
    //     .plus({ days: i })
    //     .toISODate()
    //     .slice(-2)
    // );
  }
  console.log("weekDayARRAY=", weekDayArray);
  // console.log("sundayARRAY=", sundayArray);
  // for (let i = 0; i < selectedDateTableArray.length; i++) {
  //   if (dayFromDayDisplayArr(i)[0] === "Sun") {
  //     tempArray.push("SUN");
  //   } else if (intervals.indexOf(selectedDateTableArray[i]) !== -1) {
  //     tempArray.push(bookingsState[0].roomUseBy);
  //   } else {
  //     tempArray.push("");
  //   }
  // }

  console.log("OCCUPIEDBY", occupiedBy);

  //======================================
  //logic to map out 7 cells with key+value for each cell
  //======================
  //selectedDateStateISO will give an ISO (e.g 25 Dec 2022, becomes 2022-12-25)
  // const selectedDateStateISO = DateTime.fromFormat(
  //   selectedDateState.slice(5),
  //   "d MMM yyyy"
  // ).toISODate();

  for (let i = 0; i < daysToShow; i++) {
    dayDisplayArr.push(
      DateTime.fromFormat(selectedDateState, "ccc, d LLL y")
        .plus({ days: i })
        .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
    );
    selectedDateTableArray.push(
      DateTime.fromISO(selectedDateStateISO).plus({ days: i }).toISODate()
      // .slice(-2)
    );
  }

  // console.log("selectedDateTableArray = ", selectedDateTableArray);

  //============================
  //Mapping the calendar cells
  //================
  // const classroomSixTableMap = selectedDateTableArray.map((ele) => (
  //   <td key={`6-${ele}`} id={`6-${ele}`}>
  //     {`6-${ele}`}
  //   </td>
  // ));

  // Intervals between fetched start and end date
  const startDate = bookingsState;
  // console.log(startDate);
  //   console.log(startDate[0]?.bookingStart);
  const startDateDt = DateTime.fromISO(startDate[0]?.bookingStart);
  // console.log(startDateDt);

  const endDate = bookingsState;
  //   console.log(endDate);
  //   console.log(endDate[0]?.bookingEnd);
  const endDateDt = DateTime.fromISO(endDate[0]?.bookingEnd);
  // console.log(endDateDt);

  const intervals = Interval.fromDateTimes(
    startDateDt,
    endDateDt.plus({ days: 1 })
  )
    .splitBy({ day: 1 })
    .map((d) => `${d.start.year}-${d.start.month}-${d.start.day}`);

  // console.log("intervals = ", intervals);

  const rowIntervals = Interval.fromDateTimes(
    startDateDt,
    endDateDt.plus({ days: 1 })
  )
    .splitBy({ day: 1 })
    .map((d) => `6-${d.start.year}-${d.start.month}-${d.start.day}`);
  // console.log("ROWINTERVALS", rowIntervals);
  //for each of the <td> in clasroom6's row, derivedinterval.filter(row6)===true

  // console.log("ROWINTERVALS2", intervals[0]);
  // console.log("sdtatypeOF", selectedDateTableArray[0]);

  const tempArray = [];
  // console.log("totemparray", typeof tempArray);

  // Split Date format to only show Day
  const dayFromDayDisplayArr = (i) => dayDisplayArr[i].split(",");
  console.log("dayFrDispArr 00 ", dayFromDayDisplayArr(0)[0]);
  console.log("DAYDISPLAYARRAY=", dayDisplayArr);
  // Added that if Day === Sun should push Sun into Array and use CSS to grey out td
  for (let i = 0; i < selectedDateTableArray.length; i++) {
    if (dayFromDayDisplayArr(i)[0] === "Sun") {
      tempArray.push("SUN");
    } else if (intervals.indexOf(selectedDateTableArray[i]) !== -1) {
      tempArray.push(bookingsState[0].roomUseBy);
    } else {
      tempArray.push("");
    }
  }

  const classroomFiveTableMap = tempArray.map((ele, i) => (
    <td key={i} id={ele} className={ele}>
      {ele}
    </td>
  ));

  useEffect(() => {
    // const testGetClassRoomSix = document.getElementById("6-2022-12-18");

    // console.log("GETCLASSROOM6-18Dec =", testGetClassRoomSix);
    // testGetClassRoomSix.innerHTML = "TESTGEbyId"

    for (let i = 0; i < daysToShow; i++) {
      [i];
    }
  }, []);

  console.log("TEMPARRAY", tempArray);

  return (
    <table className="table" border="solid">
      <tbody>
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
          <th
            scope="col"
            className="table__cell--header table__cell--align-left"
          >
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
          {occupiedBy[0].map((ele, i) => (
            <td key={`${ele}+${i}`}>{ele}</td>
          ))}
        </tr>

        <tr>
          <td>Classroom 2</td>
          {occupiedBy[1].map((ele, i) => (
            <td key={`${ele}+${i}`}>{ele}</td>
          ))}
        </tr>

        <tr>
          <td>Classroom 3</td>
          {occupiedBy[2].map((ele, i) => (
            <td key={`${ele}+${i}`}>{ele}</td>
          ))}
        </tr>

        <tr>
          <td>Classroom 4</td>
          {occupiedBy[3].map((ele, i) => (
            <td key={`${ele}+${i}`}>{ele}</td>
          ))}
        </tr>

        <tr>
          <td>Classroom 5</td>
          {classroomFiveTableMap}
        </tr>

        <tr>
          <td>Classroom 6</td>
          {occupiedBy[5].map((ele, i) => (
            <td key={`${ele}+${i}`}>{ele}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default CalendarDisplay;
