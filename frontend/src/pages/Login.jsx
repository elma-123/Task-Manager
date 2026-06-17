import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {

    try {

      const res =
        await apiService.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      if (
        res.data.role === "admin"
      ) {

        navigate("/admin");

      } else {

        navigate("/user");

      }

    } catch {

      alert(
        "Invalid Credentials"
      );

    }
  };

  return (

    <div className="login-page">

      <div className="login-box">

        <h1>
          Task Manager
        </h1>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={login}
        >
          Login
        </button>

      </div>

    </div>
  );
}