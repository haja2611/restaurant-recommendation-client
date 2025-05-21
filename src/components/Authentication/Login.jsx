import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/auth/login", form, {
        withCredentials: true,
      });
      alert("Login successful!");
      navigate("/Home");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed!");
    }
  };

  return (
    <div
      className="container mt-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card p-4 shadow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            className="form-control mb-3"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit" className="btn btn-success w-100 mb-2">
            Login
          </button>
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <span
            style={{
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
