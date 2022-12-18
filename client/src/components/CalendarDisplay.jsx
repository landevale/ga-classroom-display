import React, { useState, useEffect } from "react";
import { DateTime, Interval } from "luxon";
import PropTypes from "prop-types";

function CalendarDisplay({ selectedDateState }) {
  // Prop validaton
  CalendarDisplay.propTypes = {
    selectedDateState: PropTypes.string,
  };

  //==============================
  //Fetching Data json and set state for Data into cohort & bookingState
  const [cohortState, setCohortState] = useState([]);
  useEffect(() => {
    fetch("/cohorts/")
      .then((response) => response.json())
      .then((data) => setCohortState(data));
  }, []);

  const [bookingsState, setBookingsState] = useState([]);
  useEffect(() => {
    fetch("/bookings/")
      .then((response) => response.json())
      .then((data) => setBookingsState(data));
  }, []);
  console.log("BOOKINGSTATE = ", bookingsState);

  //Changing selectedDateState to working ISO date
  const selectedISODate = DateTime.fromFormat(
    selectedDateState.slice(5),
    "d MMM yyyy"
  ).toISO();

  //===========================================================
  const daysToShow = 7; //EDIT DAYS TO SHOW IN CALENDAR HERE
  //===========================================================
  //===========================================================
  const numberOfClassRooms = 6; //EDIT Number of Classrooms HERE
  //===========================================================

  //==========================================
  // Logic for creating empty array (to be appended later) then mapped onto table
  const occupiedBy = [];
  for (let i = 0; i < numberOfClassRooms; i++) {
    occupiedBy.push([]);
    for (let j = 0; j < daysToShow; j++) {
      occupiedBy[i].push("");
    }
  }
  //==========================================
  // Logic for looping through ALL bookings
  // Populate the calendar with the courseCode of each and every cohort, regardless of whether overlap or not (stretch-> check for overlaps and include an asterisk *)

  const weekDayArray = [];
  for (let i = 0; i < daysToShow; i++) {
    weekDayArray.push(
      DateTime.fromFormat(selectedDateState, "ccc, d LLL y")
        .plus({ days: i })
        .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
        .slice(0, 3)
    );
  }

  for (let i = 0; i < cohortState.length; i++) {
    let currDate = "";
    let currCohortStartDate = "";
    let currCohortEndDate = "";
    for (let j = 0; j < daysToShow; j++) {
      currDate = new Date(selectedDateState);
      currDate = new Date(
        DateTime.fromISO(selectedISODate).plus({ days: j }).toISO()
      );
      currCohortStartDate = new Date(cohortState[i].startDate);
      currCohortEndDate = new Date(cohortState[i].endDate);
      if (currCohortStartDate <= currDate && currCohortEndDate >= currDate) {
        occupiedBy[cohortState[i].classRoom - 1][j] = cohortState[i].courseCode;
      }
    }
    //======================================
    //Logic to fill in based on DaysOnCampus
    // IF dayoncampus weekDay = false && IF cell currently populated by the current courseIndex (logic loops through ALL courses)
    // Need to do the logic for alternate saturdays
    for (let k = 0; k < weekDayArray.length; k++) {
      switch (weekDayArray[k]) {
        case "Mon":
          if (
            cohortState[i].daysOnCampus.days.monday === false &&
            cohortState[i].courseCode ===
              occupiedBy[cohortState[i].classRoom - 1][k]
          ) {
            occupiedBy[cohortState[i].classRoom - 1][k] = "";
          }
          break;
        case "Tue":
          if (
            cohortState[i].daysOnCampus.days.tuesday === false &&
            cohortState[i].courseCode ===
              occupiedBy[cohortState[i].classRoom - 1][k]
          ) {
            occupiedBy[cohortState[i].classRoom - 1][k] = "";
          }
          break;
        case "Wed":
          if (
            cohortState[i].daysOnCampus.days.wednesday === false &&
            cohortState[i].courseCode ===
              occupiedBy[cohortState[i].classRoom - 1][k]
          ) {
            occupiedBy[cohortState[i].classRoom - 1][k] = "";
          }
          break;
        case "Thu":
          if (
            cohortState[i].daysOnCampus.days.thursday === false &&
            cohortState[i].courseCode ===
              occupiedBy[cohortState[i].classRoom - 1][k]
          ) {
            occupiedBy[cohortState[i].classRoom - 1][k] = "";
          }
          break;
        case "Fri":
          if (
            cohortState[i].daysOnCampus.days.friday === false &&
            cohortState[i].courseCode ===
              occupiedBy[cohortState[i].classRoom - 1][k]
          ) {
            occupiedBy[cohortState[i].classRoom - 1][k] = "";
          }
          break;
        case "Sat":
          if (
            cohortState[i].altSaturdays === "none" &&
            cohortState[i].courseCode ===
              occupiedBy[cohortState[i].classRoom - 1][k]
          ) {
            occupiedBy[cohortState[i].classRoom - 1][k] = "";
          }
          break;
      }
    }
  }
  //=============================================
  //Logic for 
  for (let i = 0; i < bookingsState.length; i++) {}
  //=============================================
  //Logic for Sundays (to be made the highest priority (aka lowest/last to be run) apart from Holidays)
  for (let m = 0; m < numberOfClassRooms; m++) {
    for (let p = 0; p < weekDayArray.length; p++) {
      if (weekDayArray[p] === "Sun") {
        occupiedBy[m][p] = "SUN";
      }
    }
  }

  //============================================
  //Populating array with calendarTable Headers
  const dateHeaderRow = [];
  for (let i = 0; i < daysToShow; i++) {
    dateHeaderRow.push(
      DateTime.fromFormat(selectedDateState, "ccc, d LLL y")
        .plus({ days: i })
        .toLocaleString(DateTime.DATE_MED)
    );
  }
  const dayHeaderRow = [];
  for (let i = 0; i < daysToShow; i++) {
    dayHeaderRow.push(
      DateTime.fromFormat(selectedDateState, "ccc, d LLL y")
        .plus({ days: i })
        .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
        .slice(0, 3)
    );
  }

  return (
    <table className="table" border="solid">
      <tbody>
        <tr className="table__row table__row--header">
          <th
            style={{ minWidth: 1200 }}
            scope="colgroup"
            colSpan={daysToShow + 1}
            className="table__cell--header table__cell--level table__cell--align-left"
          >
            Timetable
          </th>
        </tr>
        <tr className="table__row table__row--subheader">
          <th
            scope="col"
            className="table__cell--header table__cell--align-left"
            rowSpan="2"
          >
            Classroom
          </th>
          {dateHeaderRow.map((ele, i) => (
            <th scope="col" className="table__cell--header" key={`${ele}${i}`}>
              {ele}
            </th>
          ))}
        </tr>
        <tr>
          {dayHeaderRow.map((ele, i) => (
            <th scope="col" className="table__cell--header" key={`${ele}${i}`}>
              {ele}
            </th>
          ))}
        </tr>
        <tr>
          <td>Classroom 1</td>
          {occupiedBy[0].map((ele, i) => (
            <td className={ele} key={`${ele}+${i}`}>
              {ele}
            </td>
          ))}
        </tr>

        <tr>
          <td>Classroom 2</td>
          {occupiedBy[1].map((ele, i) => (
            <td className={ele} key={`${ele}+${i}`}>
              {ele}
            </td>
          ))}
        </tr>

        <tr>
          <td>Classroom 3</td>
          {occupiedBy[2].map((ele, i) => (
            <td className={ele} key={`${ele}+${i}`}>
              {ele}
            </td>
          ))}
        </tr>

        <tr>
          <td>Classroom 4</td>
          {occupiedBy[3].map((ele, i) => (
            <td className={ele} key={`${ele}+${i}`}>
              {ele}
            </td>
          ))}
        </tr>

        <tr>
          <td>Classroom 5</td>
          {occupiedBy[4].map((ele, i) => (
            <td className={ele} key={`${ele}+${i}`}>
              {ele}
            </td>
          ))}
        </tr>

        <tr>
          <td>Classroom 6</td>
          {occupiedBy[5].map((ele, i) => (
            <td className={ele} key={`${ele}+${i}`}>
              {ele}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default CalendarDisplay;
