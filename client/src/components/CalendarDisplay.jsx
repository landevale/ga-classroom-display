import React from "react";
import { DateTime } from "luxon";

function CalendarDisplay({ selectedDateState }) {
  const dayDisplayArr = [];

  for (let i = 0; i < 7; i++) {
    dayDisplayArr.push(
      DateTime.fromFormat(selectedDateState, "ccc, d LLL y")
        .plus({ days: i })
        .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
    );
  }

  //need to filter by date, then by class. with that info, push data into array with IF-sun logic and map out

  

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
        <td></td>
        <td>SEI-40</td>
        <td>SEI-40</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>

      {/* <tbody className="table__body">Classroom 2</tbody>
      <tbody className="table__body">Classroom 3</tbody>
      <tbody className="table__body">Classroom 4</tbody>
      <tbody className="table__body">Classroom 5</tbody>
      <tbody className="table__body">Classroom 6</tbody> */}
    </table>
  );
}
export default CalendarDisplay;
