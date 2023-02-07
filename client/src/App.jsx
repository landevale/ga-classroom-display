import { SelectedDateProvider } from "./context/SelectedDateContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "./layout/SharedLayout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import SingleCourse from "./protected/SingleCourse";
import ProtectRoute from "./routes/ProtectRoute";
import Bookings from "./protected/Bookings";
import SingleBooking from "./protected/SingleBooking";
import Display from "./pages/Display";
import DisplayClassroom from "./components/display/DisplayClassroom";

export default function App() {
  return (
    <SelectedDateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/login" element={<Login />} />
            <Route path="/display" element={<Display />} />
          </Route>

          <Route element={<ProtectRoute />}>
            <Route path="/admin" element={<SharedLayout />}>
              <Route index element={<Home />} />
              <Route path="/admin/course/:id" element={<SingleCourse />} />
              <Route path="/admin/bookings/" element={<Bookings />} />
              <Route path="/admin/bookings/:id" element={<SingleBooking />} />
            </Route>
          </Route>
          {/* No Navbar */}
          <Route path="/display/:id" element={<DisplayClassroom />} />
        </Routes>
      </BrowserRouter>
    </SelectedDateProvider>
  );
}
