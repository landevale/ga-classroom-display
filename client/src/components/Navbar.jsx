import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav>
        <div>
          <h1>General Assembly Singapore</h1>
          <h2>Classroom Display</h2>
          <a>
            <Link to="/">Home</Link>
          </a>
          {"    "}
          <a>
            <Link to="/holidays">Holidays</Link>
          </a>
        </div>
      </nav>

      <br />
    </>
  );
}

export default Navbar;
