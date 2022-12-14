import { useParams } from "react-router-dom";

function ClassroomDisplay() {
  const { id } = useParams();
  return (
    <>
      <main>
        <h1>Display Classroom Info</h1>
        <hr />
        <h2>SEI-40</h2>
      </main>
    </>
  );
}

export default ClassroomDisplay;
