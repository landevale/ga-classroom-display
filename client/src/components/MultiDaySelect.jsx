// import React, { useState } from "react";

// export default function DaysMultiDropdown(props) {
//   const [selectedDayOptions, setSelectedDayOptions] = useState([]);

//   const handleChange = (event) => {
//     const options = event.target.options;
//     const value = [];
//     for (let i = 0; i < options.length; i++) {
//       if (options[i].selected) {
//         value.push(options[i].value);
//       }
//     }
//     setSelectedDayOptions(value);
//   };

//   const dayOptions = [
//     { value: "Mon", label: "Monday" },
//     { value: "Tue", label: "Tuesday" },
//     { value: "Wed", label: "Wednesday" },
//     { value: "Thu", label: "Thursday" },
//     { value: "Fri", label: "Friday" },
//   ];
//   return (
//     <div>
//       <select multiple onChange={handleChange}>
//         {dayOptions.map((option, index) => (
//           <option key={index} value={option.value}>
//             {option.value}
//           </option>
//         ))}
//       </select>
//       <p>Selected options: {selectedDayOptions.join(", ")}</p>
//     </div>
//   );
// }


import React, { useState } from 'react';

function MultiDaySelect() {
  // create a state variable to store the selected options
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (event) => {
    // get the options that were just selected
    const options = event.target.options;
    // create a new array of the selected option values
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    // update the state with the new array of selected values
    setSelectedOptions(selectedValues);
  };

  return (
    <select multiple onChange={handleChange}>
      <option value="Mon">Monday</option>
      <option value="Tue">Tuesday</option>
      <option value="Wed">Wednesday</option>
      <option value="Thu">Thursday</option>
      <option value="Fri">Friday</option>
    </select>
  );
}

export default MultiDaySelect;
