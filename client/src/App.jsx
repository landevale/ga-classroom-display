import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SharedLayout from "./pages/SharedLayout";
import LogLayout from "./pages/LogLayout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Bookings from "./pages/Bookings";
import Display from "./pages/Display";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import Error from "./pages/Error";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/bookings" element={<Bookings />} />
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
      </BrowserRouter>
    </div>
  );
}

export default App;
