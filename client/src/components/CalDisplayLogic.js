import React, { useState, useEffect, useContext } from "react";
import { DateTime } from "luxon";
import { DataContext } from "../App";

const useCalDisplayLogic = () => {
  const {
    selectedDateState,
    daysToShow,
    numberOfClassRooms,
    occupiedFinalArray,
    setOccupiedFinalArray,
  } = useContext(DataContext);

  //==============================
  //Fetching Data json and set state for Data into cohort & bookingState
  const [cohortState, setCohortState] = useState([]);
  useEffect(() => {
    fetch("/api/cohorts/")
      .then((response) => response.json())
      .then((data) => setCohortState(data));
  }, []);
  // console.log("COHORTSTATE", cohortState);

  const [bookingsState, setBookingsState] = useState([]);
  useEffect(() => {
    fetch("/api/bookings/")
      .then((response) => response.json())
      .then((data) => setBookingsState(data));
  }, []);

  // console.log("BOOKINGSSTATE", bookingsState);
  useEffect(() => {
    //Changing selectedDateState to working ISO date
    const selectedISODate = DateTime.fromFormat(
      selectedDateState.slice(5),
      "d MMM yyyy"
    ).toISO();
    //===========================================================
    // const daysToShow = 7; //EDIT DAYS TO SHOW IN CALENDAR HERE (future feature)
    //===========================================================
    //===========================================================
    // const numberOfClassRooms = 6; //EDIT Number of Classrooms HERE (future feature)
    //===========================================================
    //==========================================
    // Logic for creating empty array (to be appended later) then mapped onto table

    const occupiedBy = [];
    for (let i = 0; i < numberOfClassRooms; i++) {
      occupiedBy.push([]);
      for (let j = 0; j < daysToShow; j++) {
        occupiedBy[i].push("");
        //occupiedBy[i; id-1].[0] = SEi40
      }
    }

    //occupiedBy= [[SEI40, SEI41,.....UXDI32],[SEI41, SEI42,.....UXDI30],[],[],[],[],[]]

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
    //weekDayArray = ["Tue","Wed","Thu","Fri","Sat","Sun","Mon"]

    const weekDateArray = [];
    for (let i = 0; i < daysToShow; i++) {
      weekDateArray.push(
        DateTime.fromFormat(selectedDateState, "ccc, d LLL y")
          .plus({ days: i })
          .toISODate()
      );
    }
    //weekDateArray = ["2022-12-21","2022-12-22"...,"2022-12-27"]

    //Actual looping through the whole list of cohorts (stored in cohortState)
    for (let i = 0; i < cohortState.length; i++) {
      let currDate = "";
      let currCohortStartDate = "";
      let currCohortEndDate = "";

      let saturdays = [];
      let evenSaturdays = [];
      let oddSaturdays = [];

      //for "7" (daysToShow) times, with each time,
      // selectedDateState = selectedDateState + 1
      for (let j = 0; j < daysToShow; j++) {
        currDate = new Date(selectedDateState);
        currDate = new Date(
          DateTime.fromISO(selectedISODate).plus({ days: j }).toISO()
        );
        currCohortStartDate = new Date(
          DateTime.fromISO(cohortState[i].startDate).toISO()
        );
        currCohortEndDate = new Date(
          DateTime.fromISO(cohortState[i].endDate).toISO()
        );

        // Check whether currentDate falls between startDate and endDate,
        //If yes, cell should display the current class/cohort that is looping through (if cell matches correct Day the cohort is present at class)
        if (currCohortStartDate <= currDate && currCohortEndDate >= currDate) {
          switch (weekDayArray[j]) {
            case "Mon":
              if (
                //if cell === Monday (matching day) and currently empty (no conflict with other classes), cell = cohort/class
                cohortState[i].daysOnCampus.monday === true &&
                occupiedBy[cohortState[i].classRoom - 1][j] === ""
              ) {
                occupiedBy[cohortState[i].classRoom - 1][j] =
                  cohortState[i].courseCode;
              } else if (
                cohortState[i].daysOnCampus.monday === true &&
                occupiedBy[cohortState[i].classRoom - 1][j] !== ""
              ) {
                occupiedBy[cohortState[i].classRoom - 1][j] =
                  "*:" + occupiedBy[cohortState[i].classRoom - 1][j];
              }
              break;

            //if cell === Tuesday (matching day) and currently empty (no conflict with other classes), cell = cohort/class
            case "Tue":
              if (
                cohortState[i].daysOnCampus.tuesday === true &&
                occupiedBy[cohortState[i].classRoom - 1][j] === ""
              ) {
                occupiedBy[cohortState[i].classRoom - 1][j] =
                  cohortState[i].courseCode;
              } else if (
                cohortState[i].daysOnCampus.tuesday === true &&
                occupiedBy[cohortState[i].classRoom - 1][j] !== ""
              ) {
                occupiedBy[cohortState[i].classRoom - 1][j] =
                  "*:" + occupiedBy[cohortState[i].classRoom - 1][j];
              }
              break;
            case "Wed":
              if (
                cohortState[i].daysOnCampus.wednesday === true &&
                occupiedBy[cohortState[i].classRoom - 1][j] === ""
              ) {
                occupiedBy[cohortState[i].classRoom - 1][j] =
                  cohortState[i].courseCode;
              } else if (
                cohortState[i].daysOnCampus.wednesday === true &&
                occupiedBy[cohortState[i].classRoom - 1][j] === ""
              ) {
                occupiedBy[cohortState[i].classRoom - 1][j] =
                  "*:" + occupiedBy[cohortState[i].classRoom - 1][j];
              }
              break;
            case "Thu":
              if (
                cohortState[i].daysOnCampus.thursday === true &&
                occupiedBy[cohortState[i].classRoom - 1][j] === ""
              ) {
                occupiedBy[cohortState[i].classRoom - 1][j] =
                  cohortState[i].courseCode;
              } else if (
                cohortState[i].daysOnCampus.thursday === true &&
                occupiedBy[cohortState[i].classRoom - 1][j] !== ""
              ) {
                occupiedBy[cohortState[i].classRoom - 1][j] =
                  "*:" + occupiedBy[cohortState[i].classRoom - 1][j];
              }
              break;
            case "Fri":
              if (
                cohortState[i].daysOnCampus.friday === true &&
                occupiedBy[cohortState[i].classRoom - 1][j] === ""
              ) {
                occupiedBy[cohortState[i].classRoom - 1][j] =
                  cohortState[i].courseCode;
              } else if (
                cohortState[i].daysOnCampus.friday === true &&
                occupiedBy[cohortState[i].classRoom - 1][j] !== ""
              ) {
                occupiedBy[cohortState[i].classRoom - 1][j] =
                  "*:" + occupiedBy[cohortState[i].classRoom - 1][j];
              }
              break;
            case "Sat":
              //======================
              //Saturday's Overall Logic (cases: Saturdays === "none","odd","even","all")

              //=====================
              //Function for finding all the Saturdays for the current Cohort/Class, and pushing into Sat array (does not take into account odd/even/Sat)
              //e.g. saturdayArray = ["24-Dec(Sat)","31-Dec(Sat)",...,"28-Feb(Sat)"]

              const findSaturdays = (startingDate, endingDate) => {
                startingDate = new Date(DateTime.fromISO(startingDate).toISO());
                let currentDate = new Date(startingDate);
                endingDate = new Date(DateTime.fromISO(endingDate).toISO());
                while (currentDate <= endingDate) {
                  if (currentDate.getDay() === 6) {
                    saturdays.push(new Date(currentDate));
                  }
                  currentDate.setDate(currentDate.getDate() + 1);
                }
              };
              findSaturdays(cohortState[i].startDate, cohortState[i].endDate);
              //Pushing all Saturdays of current class/cohort into 2 arrays, evenSaturdays & oddSaturdays
              for (let n = 0; n < saturdays.length; n++) {
                if ((n + 1) % 2 === 0) {
                  evenSaturdays.push(saturdays[n].getDate());
                } else {
                  oddSaturdays.push(saturdays[n].getDate());
                }
              }
              //generating an array with just the day integer, e.h. [21,22,23,24,25,26,27]
              let weekDateCompareArray = [];
              for (let d = 0; d < weekDateArray.length; d++) {
                weekDateCompareArray.push(new Date(weekDateArray[d]).getDate());
              }

              //=====================
              //IF statements to determine whether the current Saturday needs to display class/cohort
              if (
                //If odd saturdays and current date display range has intersect with oddSaturday array, display class/cohort
                cohortState[i].altSaturdays === "odd" &&
                weekDateCompareArray.filter((value) =>
                  oddSaturdays.includes(value)
                ).length !== 0 &&
                occupiedBy[cohortState[i].classRoom - 1][j] === ""
              ) {
                occupiedBy[cohortState[i].classRoom - 1][j] =
                  cohortState[i].courseCode;
              } else if (
                cohortState[i].altSaturdays === "odd" &&
                weekDateCompareArray.filter((value) =>
                  oddSaturdays.includes(value)
                ).length !== 0 &&
                occupiedBy[cohortState[i].classRoom - 1][j] !== ""
              ) {
                occupiedBy[cohortState[i].classRoom - 1][j] =
                  "*:" + occupiedBy[cohortState[i].classRoom - 1][j];
              }

              if (
                //If even saturdays and current date display range has intersect with evenSaturday array, display class/cohort
                cohortState[i].altSaturdays === "even" &&
                weekDateCompareArray.filter((value) =>
                  evenSaturdays.includes(value)
                ).length !== 0 &&
                occupiedBy[cohortState[i].classRoom - 1][j] === ""
              ) {
                occupiedBy[cohortState[i].classRoom - 1][j] =
                  cohortState[i].courseCode;
              } else if (
                cohortState[i].altSaturdays === "even" &&
                weekDateCompareArray.filter((value) =>
                  evenSaturdays.includes(value)
                ).length !== 0 &&
                occupiedBy[cohortState[i].classRoom - 1][j] !== ""
              ) {
                occupiedBy[cohortState[i].classRoom - 1][j] =
                  "*:" + occupiedBy[cohortState[i].classRoom - 1][j];
              }

              if (
                //If all saturdays, and classroom currently empty, display class/cohort
                cohortState[i].altSaturdays === "all" &&
                occupiedBy[cohortState[i].classRoom - 1][j] === ""
              ) {
                occupiedBy[cohortState[i].classRoom - 1][j] =
                  cohortState[i].courseCode;
              } else if (
                cohortState[i].altSaturdays === "all" &&
                occupiedBy[cohortState[i].classRoom - 1][j] !== ""
              ) {
                occupiedBy[cohortState[i].classRoom - 1][j] =
                  "*:" + occupiedBy[cohortState[i].classRoom - 1][j];
              }
              break;
          }
        }
      }
    }

    //Logic for Sundays (to be made the 2nd highest priority (aka 2nd lowest/2nd last to be run) apart from Holidays)
    for (let m = 0; m < numberOfClassRooms; m++) {
      for (let p = 0; p < weekDayArray.length; p++) {
        if (weekDayArray[p] === "Sun") {
          occupiedBy[m][p] = "SUN";
        }
      }
    }

    //=============================================
    //Logic for HOLIDAYS && Manual Bookings
    //===================
    //1) Find holidays, 2)Iterate through all the classrooms' occupiedBy arrays, and replace with roomUseBy if displayDate is between start and end date

    //Loop through all the bookings state to scan for holidays === true

    //Depending on whether it is all Classrooms affected (holiday/full-booking) or just 1 classroom (in the case of manual booking), will replace the correct cell with the the eventName/holiday
    for (let i = 0; i < bookingsState.length; i++) {
      let currDate = "";
      let currBookingStartDate = "";
      let currBookingEndDate = "";
      // currBookingStartDate = new Date(bookingsState[i].bookingStart);
      // currBookingEndDate = new Date(bookingsState[i].bookingEnd);

      // console.log("BOOKSTART Van = ", bookingsState[i].bookingStart);
      currBookingStartDate = new Date(
        DateTime.fromISO(bookingsState[i].bookingStart).toISO()
      );
      currBookingEndDate = new Date(
        DateTime.fromISO(bookingsState[i].bookingEnd).toISO()
      );

      // console.log("SELDATESTATE in booking = ", selectedDateState);
      // console.log("CurrBookStart", new Date(
      //     DateTime.fromISO(currBookingStartDate).toISO()))
      // console.log(
      //   "CurrBookEnd",
      //   new Date(DateTime.fromISO(currBookingEndDate).toISO())
      // );

      if (bookingsState[i].holiday === true) {
        //IF holiday === true, loop through all the classRooms and through every displayed day, check whether displayDate intersects with holiday period, replace holiday's name in the cell
        for (let j = 0; j < occupiedBy.length; j++) {
          for (let k = 0; k < occupiedBy[j].length; k++) {
            // currDate = new Date(selectedDateState);
            // currDate = new Date(
            //   DateTime.fromISO(selectedISODate).plus({ days: k }).toISO()
            // );
            currDate = new Date(selectedDateState);
            currDate = new Date(
              DateTime.fromISO(selectedISODate).plus({ days: k }).toISO()
            );
            // console.log("booking compare Curr Date = ", currDate);
            if (
              currBookingStartDate <= currDate &&
              currBookingEndDate >= currDate
            ) {
              occupiedBy[j][k] = `H:${bookingsState[i].roomUseBy}`;
            }
          }
        }

        //If not holiday, but is institution-wide event (occupies all classrooms),
        //loop through all classrooms and every day in the classroom
      } else if (
        bookingsState[i].holiday === false &&
        bookingsState[i].classRoom === undefined
      ) {
        //loop through all the classrooms
        for (let j = 0; j < occupiedBy.length; j++) {
          //loop through the array of occupiedBy
          for (let k = 0; k < occupiedBy[j].length; k++) {
            currDate = new Date(selectedDateState);
            currDate = new Date(
              DateTime.fromISO(selectedISODate).plus({ days: k }).toISO()
            );
            //check for whether date of booking falls withing display date and replace if YES
            if (
              currBookingStartDate <= currDate &&
              currBookingEndDate >= currDate &&
              occupiedBy[j][k].slice(0, 2) !== "H:" &&
              occupiedBy[j][k] !== "" &&
              occupiedBy[j][k] !== "SUN"
            ) {
              occupiedBy[j][k] = "*:" + bookingsState[i].roomUseBy;
            } else if (
              currBookingStartDate <= currDate &&
              currBookingEndDate >= currDate &&
              occupiedBy[j][k].slice(0, 2) !== "H:"
            ) {
              occupiedBy[j][k] = bookingsState[i].roomUseBy;
            }
          }
        }
      } else {
        //situation where NOT holiday && only occupy 1 classroom

        //loop through the particular classroom everyday ("7" days/times) and replace if booking intersects with displayDate range (unless holiday, then remain unchanged)
        for (
          let m = 0;
          m < occupiedBy[bookingsState[i].classRoom - 1].length;
          m++
        ) {
          currDate = new Date(selectedDateState);
          currDate = new Date(
            DateTime.fromISO(selectedISODate).plus({ days: m }).toISO()
          );
          // console.log("CurrDate non hol-1daybook = ", currDate);
          // console.log("cbsd", currBookingStartDate);
          // console.log("cbed", currBookingEndDate);
          if (
            // true
            currBookingStartDate <= currDate &&
            currBookingEndDate >= currDate &&
            occupiedBy[bookingsState[i].classRoom - 1][m].slice(0, 2) !==
              "H:" &&
            occupiedBy[bookingsState[i].classRoom - 1][m] !== "" &&
            occupiedBy[bookingsState[i].classRoom - 1][m] !== "SUN"
          ) {
            console.log("booking detected + overwrite");
            occupiedBy[bookingsState[i].classRoom - 1][m] =
              "*:" + bookingsState[i].roomUseBy;
          } else if (
            currBookingStartDate <= currDate &&
            currBookingEndDate >= currDate &&
            occupiedBy[bookingsState[i].classRoom - 1][m].slice(0, 2) !== "H:"
          ) {
            occupiedBy[bookingsState[i].classRoom - 1][m] =
              bookingsState[i].roomUseBy;
          }
        }
      }
    }
    // console.log("OCCUPIEDBY", occupiedBy);
    setOccupiedFinalArray(occupiedBy);
    // console.log("OCcFinArray", occupiedFinalArray);
  }, [selectedDateState, bookingsState, cohortState]);
  // //============================================
  // //Populating table with Headers (e.g. date, and day)
  // const dateHeaderRow = [];
  // for (let i = 0; i < daysToShow; i++) {
  //   dateHeaderRow.push(
  //     DateTime.fromFormat(selectedDateState, "ccc, d LLL y")
  //       .plus({ days: i })
  //       .toLocaleString(DateTime.DATE_MED)
  //   );
  // }
  // const dayHeaderRow = [];
  // for (let i = 0; i <; daysToShow; i++) {
  //   dayHeaderRow.push(
  //     DateTime.fromFormat(selectedDateState, "ccc, d LLL y")
  //       .plus({ days: i })
  //       .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  //       .slice(0, 3)
  //   );
  // }
  // return occupiedBy
  return occupiedFinalArray;
};

export default useCalDisplayLogic;
