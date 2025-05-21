import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/auth/register", form);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed!");
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
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="name"
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            className="form-control mb-3"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
            type="email"
          />
          <input
            className="form-control mb-3"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit" className="btn btn-primary w-100 mb-2">
            Register
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <span
            style={{
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
