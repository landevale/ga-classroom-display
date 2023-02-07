import React, { useContext } from "react";
import { DateTime } from "luxon";
import CalendarDisplay from "../components/home/CalendarDisplay";
// import CalendarDisplay from "../components/CalendarDisplay";
// import { DataContext } from "../App";

function Home() {
  //   const { setSelectedDateState } = useContext(DataContext);
  // const [selectedDateState, setSelectedDateState] = useState(
  //   // DateTime.now().toFormat("yyyy-MM-dd")
  //   DateTime.now()
  //     .plus({ days: 0 })
  //     .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  // );

  // useEffect(() => {
  //   // console.log(typeof selectedDateState);
  //   // console.log(selectedDateState);
  //   // console.log(DateTime.selectedDateState.plus({ days: 30 }));
  // }, [selectedDateState]);

  //   const handleDate = (e) => {
  //     const oldFormat = "yyyy-MM-dd";
  //     const newDate = DateTime.fromFormat(e, oldFormat).toLocaleString(
  //       DateTime.DATE_MED_WITH_WEEKDAY
  //     );
  //     // console.log("New date " + newDate);
  //     setSelectedDateState(newDate);
  //     // console.log("unparsed newDate", DateTime.fromFormat(e, oldFormat));
  //     // console.log("e", e);
  //     // console.log("typeof e", typeof e);
  //   };

  return (
    <>

      <div className="pt-4">
        {/* <input
          type="date"
          id="start"
          min={DateTime.now().toFormat("yyyy-MM-dd")}
          // max={DateTime.now().plus({ days: 6 }).toISODate()}
          onChange={(e) => handleDate(e.target.value)}
        /> */}
      </div>
      <CalendarDisplay />
    </>
  );
}

export default Home;
