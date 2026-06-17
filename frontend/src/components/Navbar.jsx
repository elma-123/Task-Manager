import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>Task Manager Dashboard</h2>

      <button
        className="btn btn-danger"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}