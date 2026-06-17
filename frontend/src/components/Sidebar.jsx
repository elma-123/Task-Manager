import { Link } from "react-router-dom";

export default function Sidebar() {

  const role =
    localStorage.getItem("role");

  return (

    <div className="sidebar">

      <h2>
        Task Manager
      </h2>

      {role === "admin" && (

        <>
          <Link to="/admin">
            Dashboard
          </Link>
        </>

      )}

      {role === "user" && (

        <>
          <Link to="/user">
            My Tasks
          </Link>
        </>

      )}

    </div>

  );
}