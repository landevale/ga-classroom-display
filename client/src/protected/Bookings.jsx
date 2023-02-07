import { UserAuth } from "../context/AuthContext";
import BookingsRegForm from "./BookingsRegForm";
import BookingsTable from "./BookingsTable";

export default function Bookings() {
  const [user, setUser] = UserAuth();

  return (
    <>
      <div className="px-4 pb-4 mb-10 mt-4 sm:px-6 lg:px-8">
        <div className="pt-4 px-4 border">
          <BookingsRegForm />
        </div>
        <BookingsTable />
      </div>
    </>
  );
}
