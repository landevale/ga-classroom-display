import React from "react";
import { DateTime } from "luxon";

function CalendarDisplay({ selectedDateState }) {
  const plusOne = DateTime.fromFormat(selectedDateState, "ccc, d LLL y")
    .plus({ days: 1 })
    .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);

  const plusTwo = DateTime.fromFormat(selectedDateState, "ccc, d LLL y")
    .plus({ days: 2 })
    .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);

  const plusThree = DateTime.fromFormat(selectedDateState, "ccc, d LLL y")
    .plus({ days: 3 })
    .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);

  const plusFour = DateTime.fromFormat(selectedDateState, "ccc, d LLL y")
    .plus({ days: 4 })
    .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);

  const plusFive = DateTime.fromFormat(selectedDateState, "ccc, d LLL y")
    .plus({ days: 5 })
    .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);

  const plusSix = DateTime.fromFormat(selectedDateState, "ccc, d LLL y")
    .plus({ days: 6 })
    .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);

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
        <th scope="col" className="table__cell--header">
          {selectedDateState}
        </th>
        <th scope="col" className="table__cell--header">
          {plusOne}
        </th>

        <th scope="col" className="table__cell--header">
          {}
        </th>
        <th scope="col" className="table__cell--header">
          {plusTwo}
        </th>
        <th scope="col" className="table__cell--header">
          {plusThree}
        </th>
        <th scope="col" className="table__cell--header">
          {plusFour}
        </th>
        <th scope="col" className="table__cell--header">
          {plusFive}
        </th>
        <th scope="col" className="table__cell--header">
          {plusSix}
        </th>
      </tr>
      <tbody className="table__body">Classroom 1</tbody>
    </table>
  );
}
export default CalendarDisplay;
