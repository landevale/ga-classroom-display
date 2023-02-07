import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import { useSelectedDate } from "../../context/SelectedDateContext";
import calendarDisplayLogic from "./DisplayLogic";

export default function CalendarDisplay() {
  const { dayHeaderRow, dateHeaderRow, selectedDate, setSelectedDate } =
    useSelectedDate();

  //   console.log("CALDLOGIC", calendarDisplayLogic())
  let calDisplayLogic = calendarDisplayLogic();

  //Classroom array for mapping Display
  const classrooms = [];
  for (let i = 0; i < 6; i++) {
    classrooms.push(`${i + 1}`);
  }
  //   console.log(classrooms)

  //   //Creating array of Weekdays to display **Days to display default "7", change code if necessary
  //   const dayHeaderRow = [];
  //   for (let i = 0; i < 7; i++) {
  //     dayHeaderRow.push(
  //       DateTime.fromISO(selectedDate).plus({ days: i }).toFormat("ccc")
  //     );
  //   }
  //   //   console.log(dayHeaderRow);
  //   //Creating array of Dates to display **Days to display default "7", change code if necessary
  //   const dateHeaderRow = [];
  //   for (let i = 0; i < 7; i++) {
  //     dateHeaderRow.push(
  //       DateTime.fromISO(selectedDate).plus({ days: i }).toFormat("d LLL yyyy")
  //     );
  //   }
  //   console.log(dateHeaderRow);

  //   useEffect(() => {
  //     console.log(dayHeaderRow);
  // console.log(selectedDate);
  // console.log(DateTime.toLocaleString(DATE_MED));
  //   }, [selectedDate]);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* <div className="sm:flex sm:items-center"> */}
        {/* <div className="sm:flex-auto"> */}
        {/* <h1 className="text-xl font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name, title, email and role.
            </p> */}
        {/* </div> */}
        {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add user
            </button>
          </div> */}
        {/* </div> */}
        <div className=" text-lg flex flex-col justify-center items-center">
          <div className="pb-1">Date</div>

          <input
            type="date"
            defaultValue={DateTime.now().toFormat("yyyy-MM-dd")}
            onChange={(e) => setSelectedDate(e.target.value)}
          ></input>
        </div>
        <div className="mt-8 flex flex-col items-center">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr className=" bg-gray-400">
                      <th scope="colgroup" colSpan={8}>
                        Timetable
                      </th>
                    </tr>

                    <tr className="divide-x divide-gray-300">
                      <th
                        scope="col"
                        className="bg-gray-300 text-lg"
                        rowSpan={2}
                      >
                        Classroom
                      </th>

                      {dateHeaderRow.map((ele) => (
                        <th
                          scope="col"
                          key={ele}
                          className=" bg-gray-200 py-1.5 pl-4 pr-4 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          {ele}
                        </th>
                      ))}
                    </tr>
                    <tr className="divide-x divide-gray-300">
                      {dayHeaderRow.map((ele) => (
                        <th
                          scope="col"
                          key={ele}
                          className="text-center py-1.5 pl-4 pr-4 text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          {ele}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-x divide-gray-300 bg-white">
                    {classrooms.map((element, index) => (
                      <tr
                        key={`${element}+${index}`}
                        className="divide-x divide-gray-300"
                      >
                        <td className="text-left text-sm font-semibold bg-gray-200 text-gray-900 sm:pl-6">
                          Room {element}
                        </td>
                        {calDisplayLogic[element - 1].map((ele, i) => (
                          <td
                            key={`${ele}+${i}`}
                            className="py-3.5 pl-4 pr-4 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            {ele}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {/* <tr className="divide-x divide-gray-200">
                      <td className="text-left text-sm font-semibold bg-gray-200 text-gray-900 sm:pl-6">
                        Classroom1
                      </td>
                      {calDisplayLogic[0].map((ele, i) => (
                        <td
                          key={`${ele}+${i}`}
                          className="py-3.5 pl-4 pr-4 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          {ele}
                        </td>
                      ))}
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
