import React, { useState } from "react";
import axios from "axios";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/register",
        form
      );
      setToken(res.data.token);
      navigate("/login");
      alert("Registration successful!");
    } catch (err) {
      alert(err.response.data.msg || "Error");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="name"
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          className="form-control mb-2"
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="form-control mb-2"
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default Register;
