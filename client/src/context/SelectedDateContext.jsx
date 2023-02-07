import { DateTime } from "luxon";
import React, { useContext, useState, createContext } from "react";

const SelectedDateContext = createContext();

export function useSelectedDate() {
  return useContext(SelectedDateContext);
}

export function SelectedDateProvider({ children }) {
  //Setting selected date to today
  const [selectedDate, setSelectedDate] = useState(
    DateTime.now().toFormat("yyyy-MM-dd")
  );

  //Creating array of Weekdays to display **Days to display default "7", change code if necessary
  const dayHeaderRow = [];
  for (let i = 0; i < 7; i++) {
    dayHeaderRow.push(
      DateTime.fromISO(selectedDate).plus({ days: i }).toFormat("ccc")
    );
  }
  // console.log(dayHeaderRow);
  //Creating array of Dates to display **Days to display default "7", change code if necessary
  const dateHeaderRow = [];
  for (let i = 0; i < 7; i++) {
    dateHeaderRow.push(
      DateTime.fromISO(selectedDate).plus({ days: i }).toFormat("d LLL yyyy")
    );
  }
  // console.log(dateHeaderRow);

  // //============================================
  // //constant values here, (future feature), to change when needed
  // const numberOfClassrooms = 6;
  // const daysToShow = 7;
  // //============================================
  // //==========================================
  // // Logic for creating empty array (to be appended later) then mapped onto table
  // //Default is 6 classrooms, change code above if needed
  // const occupiedBy = [];
  // for (let i = 0; i < numberOfClassrooms; i++) {
  //   occupiedBy.push([]);
  //   for (let j = 0; j < daysToShow; j++) {
  //     occupiedBy[i].push("");
  //   }
  // }
  // // console.log("OCC BY", occupiedBy)
  // // occupiedBy = Array of 6 arrays(representing 6 classrooms),
  // // within each of the 6 arrays, there are 7 empty strings,
  // // (representing 7 empty days) to be filled later in logic

  return (
    <SelectedDateContext.Provider
      value={{
        dayHeaderRow,
        dateHeaderRow,
        selectedDate,
        setSelectedDate,
        // occupiedBy,
        // numberOfClassrooms,
        // daysToShow,
      }}
    >
      {children}
    </SelectedDateContext.Provider>
  );
}
