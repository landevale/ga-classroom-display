import React, { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import SharedLayout from "./pages/SharedLayout";
import LogLayout from "./pages/LogLayout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import EditCourse from "./pages/EditCourse";
import Bookings from "./pages/Bookings";
import Display from "./pages/Display";
import DisplayClassroom from "./pages/DisplayClassroom";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Testing from "./pages/Testing";
import { DateTime } from "luxon";

export const DataContext = createContext();
console.log("DataContent", DataContext);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(true);
  const [user, setUser] = useState("");
  const [selectedDateState, setSelectedDateState] = useState(
    // DateTime.now().toFormat("yyyy-MM-dd")
    DateTime.now()
      .plus({ days: 0 })
      .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  );
  const [occupiedFinalArray,setOccupiedFinalArray] = useState([]);
  //===========================================================
  const daysToShow = 7; //EDIT DAYS TO SHOW IN CALENDAR HERE (future feature)
  //===========================================================
  //===========================================================
  const numberOfClassRooms = 6; //EDIT Number of Classrooms HERE (future feature)
  //===========================================================
  return (
    <div className="App">
      <DataContext.Provider
        value={{
          user,
          setUser,
          notLoggedIn,
          setNotLoggedIn,
          isLoggedIn,
          setIsLoggedIn,
          selectedDateState,
          setSelectedDateState,
          occupiedFinalArray,
          setOccupiedFinalArray,
          daysToShow,
          numberOfClassRooms,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SharedLayout user={user} />}>
              <Route index element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/editcourse/:id" element={<EditCourse />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/display" element={<Display />} />
              <Route path="*" element={<Error />} />
              <Route path="/test" element={<Testing />} />
            </Route>
            {/* Banner */}

            <Route path="/" element={<LogLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout setUser={setUser} />} />
            </Route>
            {/* No Navbar */}
            <Route path="/display/:id" element={<DisplayClassroom />} />
          </Routes>
        </BrowserRouter>
      </DataContext.Provider>
    </div>
  );
}

export default App;
