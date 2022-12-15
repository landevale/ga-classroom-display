import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import CalendarDisplay from "../components/CalendarDisplay";

function Home() {
  const [selectedDateState, setSeletedDateState] = useState(
    // DateTime.now().toFormat("yyyy-MM-dd")
    DateTime.now()
      .plus({ days: 0 })
      .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  );

  useEffect(() => {
    console.log(typeof selectedDateState);
    console.log(selectedDateState);
    // console.log(DateTime.selectedDateState.plus({ days: 30 }));
  }, [selectedDateState]);

  const handleDate = (e) => {
    const oldFormat = "yyyy-MM-dd";
    const newDate = DateTime.fromFormat(e, oldFormat).toLocaleString(
      DateTime.DATE_MED_WITH_WEEKDAY
    );
    console.log("New date " + newDate);
    setSeletedDateState(newDate);
  };

  return (
    <>
      <div>
        <h1>This is Homepage.</h1>
      </div>
      <div>
        <input
          type="date"
          id="start"
          min={DateTime.now().toFormat("yyyy-MM-dd")}
          // max={DateTime.now().plus({ days: 6 }).toISODate()}
          onChange={(e) => handleDate(e.target.value)}
        />
      </div>
      <CalendarDisplay selectedDateState={selectedDateState} />
    </>
  );
}

export default Home;
