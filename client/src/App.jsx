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
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import Error from "./pages/Error";

export const DataContext = createContext();
console.log("DataContent", DataContext);

function App() {
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: "User1" });

  return (
    <div className="App">
      <BrowserRouter>
        <DataContext.Provider
          setNotLoggedIn={setNotLoggedIn}
          notLoggedIn={notLoggedIn}
          user={user}
        >
          <Routes>
            <Route path="/" element={<SharedLayout user={user} />}>
              <Route index element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/editcourse/:id" element={<EditCourse />} />
              <Route path="*" element={<Error />} />
            </Route>
            {/* Banner */}

            <Route path="/" element={<LogLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
            {/* No Navbar */}
            <Route path="/display" element={<Display />} />
            <Route path="/display:id" element={<Display />} />
          </Routes>
        </DataContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
