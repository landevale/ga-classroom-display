import { Link } from "react-router-dom";

export default function Display() {
  const classrooms = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <div className=" text-center pt-6">
        {classrooms.map((ele, i) => (
          <>
          <button className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <Link key={i} to={`/display/${ele}`}>
              Classroom {ele}
            </Link>
            </button>
            <br />
            <br />
          </>
        ))}
      </div>
    </>
  );
}
