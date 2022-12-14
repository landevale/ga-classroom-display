import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Holidays from "./pages/Holidays";
import ClassroomDisplay from "./pages/ClassroomDisplay";
import Error from "./pages/Error";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/holidays" element={<Holidays />} />
          <Route path="/classroomdisplay" element={<ClassroomDisplay />} />
          <Route path="/classroomdisplay:id" element={<ClassroomDisplay />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
