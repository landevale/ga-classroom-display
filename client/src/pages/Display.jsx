import React from "react";
import { Link } from "react-router-dom";

function Display() {
  const classrooms = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <div>
        {classrooms.map((ele, i) => (
          <>
            <Link key={i} to={`/display/${ele}`}>
              Classroom {ele}
            </Link>
            <br />
            <br />
          </>
        ))}
      </div>
    </>
  );
}

export default Display;
