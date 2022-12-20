import React, { useState } from "react";

export default function DaysMultiDropdown(props) {
  const [selectedDayOptions, setSelectedDayOptions] = useState([]);

  const handleChange = (event) => {
    const options = event.target.options;
    const value = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedDayOptions(value);
  };

  const dayOptions = [
    { value: "Mon", label: "Monday" },
    { value: "Tue", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
  ];
  return (
    <div>
      <select multiple onChange={handleChange}>
        {dayOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      <p>Selected options: {selectedDayOptions.join(", ")}</p>
    </div>
  );
}
