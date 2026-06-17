import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";

import AdminDashboard
  from "./pages/AdminDashboard";

import UserDashboard
  from "./pages/UserDashboard";

import AuthGuard
  from "./components/AuthGuard";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/admin"
          element={
            <AuthGuard role="admin">
              <AdminDashboard />
            </AuthGuard>
          }
        />

        <Route
          path="/user"
          element={
            <AuthGuard role="user">
              <UserDashboard />
            </AuthGuard>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;