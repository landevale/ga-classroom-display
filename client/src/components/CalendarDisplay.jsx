import React, { useEffect, useContext } from "react";
import { DateTime, Interval } from "luxon";
import { DataContext } from "../App";
import PropTypes from "prop-types";
import useCalDisplayLogic from "./CalDisplayLogic";
import { useCallback } from "react";

export default function CalendarDisplay() {
  // Prop validaton
  const { selectedDateState, daysToShow, occupiedFinalArray } =
    useContext(DataContext);
  CalendarDisplay.propTypes = {
    selectedDateState: PropTypes.string,
  };

  const calDisplayLogic = useCalDisplayLogic();
  console.log(calDisplayLogic);

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
          {calDisplayLogic[0]?.map((ele, i) => (
            <td className={ele} key={`${ele}+${i}`}>
              {ele}
            </td>
          ))}
        </tr>

        <tr>
          <td>Classroom 2</td>
          {calDisplayLogic[1]?.map((ele, i) => (
            <td className={ele} key={`${ele}+${i}`}>
              {ele}
            </td>
          ))}
        </tr>

        <tr>
          <td>Classroom 3</td>
          {calDisplayLogic[2]?.map((ele, i) => (
            <td className={ele} key={`${ele}+${i}`}>
              {ele}
            </td>
          ))}
        </tr>

        <tr>
          <td>Classroom 4</td>

          {calDisplayLogic[3]?.map((ele, i) => (
            <td className={ele} key={`${ele}+${i}`}>
              {ele}
            </td>
          ))}
        </tr>

        <tr>
          <td>Classroom 5</td>
          {calDisplayLogic[4]?.map((ele, i) => (
            <td className={ele} key={`${ele}+${i}`}>
              {ele}
            </td>
          ))}
        </tr>

        <tr>
          <td>Classroom 6</td>

          {calDisplayLogic[5]?.map((ele, i) => (
            <td className={ele} key={`${ele}+${i}`}>
              {ele}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
