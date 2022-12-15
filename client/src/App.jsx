import React, { useState } from "react";
// import reactLogo from "./assets/react.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Bookings from "./pages/Bookings";
import Display from "./pages/Display";
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
          {/* No Navbar */}
          <Route path="/display" element={<Display />} />
          <Route path="/display:id" element={<Display />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
