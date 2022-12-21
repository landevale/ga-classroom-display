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
    fetch("/api/cohorts/")
      .then((response) => response.json())
      .then((data) => setCohortState(data));
  }, []);

  const [bookingsState, setBookingsState] = useState([]);
  useEffect(() => {
    fetch("/api/bookings/")
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
  const weekDateArray = [];
  for (let i = 0; i < daysToShow; i++) {
    weekDateArray.push(
      DateTime.fromFormat(selectedDateState, "ccc, d LLL y")
        .plus({ days: i })
        .toISODate()
    );
  }
  console.log("weekdatearray = ", weekDateArray);

  for (let i = 0; i < cohortState.length; i++) {
    let currDate = "";
    let currCohortStartDate = "";
    let currCohortEndDate = "";

    let saturdays = [];

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
          //======================
          //Function for finding all the Saturdays and pushing into Sat array (does not take into account odd/even/Sat)
          // let saturdays = [];
          let evenSaturdays = [];
          let oddSaturdays = [];
          //
          const findSaturdays = (startingDate, endingDate) => {
            // let currentDate = new Date(cohortState[i].startDate);

            startingDate = new Date(DateTime.fromISO(startingDate).toISO());
            let currentDate = new Date(startingDate);
            // console.log("CURRDATE", currentDate);
            endingDate = new Date(DateTime.fromISO(endingDate).toISO());
            // console.log("ENDINGDATE", endingDate);
            // console.log(startingDate, endingDate);
            while (currentDate <= endingDate) {
              // console.log("YES CURRENT < START")
              if (currentDate.getDay() === 6) {
                console.log("YES FOUND SAT", currentDate);
                
                saturdays.push(new Date(currentDate));
              }
              currentDate.setDate(currentDate.getDate() + 1);
            }
            console.log("SATURDAYS", saturdays);

            // console.log(
            //   "startISODate",
            //   DateTime.fromISO(cohortState[i].startDate).toISODate()
            // );

            // console.log(
            //   "startISODate",
            //   DateTime.fromISO(cohortState[i].endDate).toISODate()
            // );
          };

          //====================
          //Finding all Saturdays' dates; both ODD and EVEN
          findSaturdays(cohortState[i].startDate, cohortState[i].endDate);
          // console.log("SATURDAYS", saturdays);

          //getting Even Saturdays

          for (let n = 0; n < saturdays.length; n++) {
            if ((n + 1) / 2 === 0) {
              evenSaturdays.push(saturdays[n]);
            }
          }
          // console.log("EVENSats = ", evenSaturdays);

          for (let g = 0; g < saturdays.length; g++) {
            if ((g + 1) / 2 !== 0) {
              oddSaturdays.push(saturdays[g]);
            }
          }
          // console.log("ODDSats = ", oddSaturdays);

          const findMatchingSaturdays = (array1, array2) => {
            array1.filter((saturDate) => array2.includes(saturDate));
          };
          //===================
          //IF Statements to check which saturdays to display, depending on none, odd,even (ALL will display automatically since it won't be removed)
          if (
            cohortState[i].altSaturdays === "none" &&
            cohortState[i].courseCode ===
              occupiedBy[cohortState[i].classRoom - 1][k]
          ) {
            occupiedBy[cohortState[i].classRoom - 1][k] = "";
          }
          if (
            cohortState[i].altSaturdays === "odd" &&
            //This means if display(daysToShow) more than 21 days, may have error, will need to refractor
            // findMatchingSaturdays(weekDateArray, evenSaturdays).length !== 0 &&
            cohortState[i].courseCode ===
              occupiedBy[cohortState[i].classRoom - 1][k]
          ) {
            occupiedBy[cohortState[i].classRoom - 1][k] = "";
            console.log(findMatchingSaturdays(weekDateArray, evenSaturdays));
          }

          if (
            cohortState[i].altSaturdays === "even" &&
            //This means if display(daysToShow) more than 21 days, may have error, will need to refractor
            // findMatchingSaturdays(weekDateArray, oddSaturdays).length !== 0 &&
            cohortState[i].courseCode ===
              occupiedBy[cohortState[i].classRoom - 1][k]
          ) {
            occupiedBy[cohortState[i].classRoom - 1][k] = "";
            findMatchingSaturdays(weekDateArray, oddSaturdays);
          }

          break;
      }
    }
  }

  //     currDate = new Date(selectedDateState);
  //   currDate = new Date(
  //   DateTime.fromISO(selectedISODate).plus({ days: j }).toISO()
  // );
  // currCohortStartDate = new Date(cohortState[i].startDate);
  // currCohortEndDate = new Date(cohortState[i].endDate);
  //   }
  // }

  // for (let i = 0; i < bookingsState.length; i++) {
  //   let currDate = "";
  //   let currBookingStartDate = "";
  //   let currBookingEndDate = "";
  //   for (let j = 0; j < daysToShow; j++) {
  //     currDate = new Date(selectedDateState);
  //     currDate = new Date(
  //       DateTime.fromISO(selectedISODate).plus({ days: j }).toISO()
  //     );
  //     currBookingStartDate = new Date(bookingsState[i].bookingStart);
  //     currBookingEndDate = new Date(bookingsState[i].bookingEnd);

  //     if (bookingsState[i].holiday === true) {
  //       occupiedBy[]
  //     }

  //     if (currBookingStartDate <= currDate && currBookingEndDate >= currDate && bookingState[i].holiday === false ) {
  //       occupiedBy[cohortState[i].classRoom - 1][j] = cohortState[i].courseCode;
  //     } else  {

  //     }
  //   }
  // }

  //=============================================
  //Logic for Sundays (to be made the highest priority (aka lowest/last to be run) apart from Holidays)
  for (let m = 0; m < numberOfClassRooms; m++) {
    for (let p = 0; p < weekDayArray.length; p++) {
      if (weekDayArray[p] === "Sun") {
        occupiedBy[m][p] = "SUN";
      }
    }
  }
  //=============================================
  //Logic for HOLIDAYS && Manual Bookings
  //1) Find holidays, 2)Iterate through all the classrooms' occupiedBy arrays, and replace with roomUseBy if dateState is between start and end date

  //Loop through all the bookings state to scan for holidays === true
  for (let i = 0; i < bookingsState.length; i++) {
    // console.log(bookingsState);
    let currDate = "";
    let currBookingStartDate = "";
    let currBookingEndDate = "";
    currBookingStartDate = new Date(bookingsState[i].bookingStart);
    currBookingEndDate = new Date(bookingsState[i].bookingEnd);
    if (bookingsState[i].holiday === true) {
      // console.log("HOLIDAYDETECTTED")
      //loop through all the classrooms
      for (let j = 0; j < occupiedBy.length; j++) {
        //loop through the array of occupiedBy
        for (let k = 0; k < occupiedBy[j].length; k++) {
          // console.log("HOLIDAYDETECTTED");
          // console.log("OCCBY", occupiedBy);
          currDate = new Date(selectedDateState);
          currDate = new Date(
            DateTime.fromISO(selectedISODate).plus({ days: k }).toISO()
          );
          //check for whether currDate (derived from dateState) is between holiday start and end date
          if (
            currBookingStartDate <= currDate &&
            currBookingEndDate >= currDate
          ) {
            occupiedBy[j][k] = `H:${bookingsState[i].roomUseBy}`;
          }
        }
      }
      //IF IT IS NOT A HOLIDAY,...replace the dates
      //If not holiday but is institution-wide event
    } else if (
      bookingsState[i].holiday === false &&
      bookingsState[i].classRoom === undefined
    ) {
      console.log("classroomUndefined");
      //loop through all the classrooms
      for (let j = 0; j < occupiedBy.length; j++) {
        //loop through the array of occupiedBy
        for (let k = 0; k < occupiedBy[j].length; k++) {
          // console.log("HOLIDAYDETECTTED");
          // console.log("OCCBY", occupiedBy);
          currDate = new Date(selectedDateState);
          currDate = new Date(
            DateTime.fromISO(selectedISODate).plus({ days: k }).toISO()
          );
          //check for whether currDate (derived from dateState) is between booking start and end date
          if (
            currBookingStartDate <= currDate &&
            currBookingEndDate >= currDate &&
            occupiedBy[j][k].slice(0, 2) !== "H:"
          ) {
            occupiedBy[j][k] = bookingsState[i].roomUseBy;
          }
        }
      }
    } else {
      //situation where NOT holiday && classroom present

      //loop through the particular classroom '7 (days)' times
      for (
        let m = 0;
        m < occupiedBy[bookingsState[i].classRoom - 1].length;
        m++
      ) {
        // console.log("bookingdefined7*2");

        currDate = new Date(selectedDateState);
        currDate = new Date(
          DateTime.fromISO(selectedISODate).plus({ days: m }).toISO()
        );
        // console.log("CURRDATE", currDate);
        if (
          currBookingStartDate <= currDate &&
          currBookingEndDate >= currDate &&
          occupiedBy[bookingsState[i].classRoom - 1][m].slice(0, 2) !== "H:"
        ) {
          console.log("classroom");
          occupiedBy[bookingsState[i].classRoom - 1][m] =
            bookingsState[i].roomUseBy;
        }
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
