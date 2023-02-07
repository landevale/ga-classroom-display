import CourseRegForm from "../components/courses/CourseRegForm";
import CourseTable from "../components/courses/CourseTable";
import { UserAuth } from "../context/AuthContext";

export default function Courses() {
  const [user, setUser] = UserAuth();

  return (
    <>
      <CourseTable />
      {user.data ? (
        <div className="px-4 mt-4 sm:px-6 lg:px-8">
          <div className="pt-4 px-4 border">
          
            <CourseRegForm />
          </div>
        </div>
      ) : null}
    </>
  );
}
