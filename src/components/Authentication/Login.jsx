import React, { useState } from "react";
import axios from "axios";
// import { setToken } from "../utils/auth";
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
      // setToken(res.data.token);

      alert("Login successful!");
      navigate("/Home");
    } catch (err) {
      alert(err.response.data.msg || "Error");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button className="btn btn-success">Login</button>
      </form>
    </div>
  );
}

export default Login;
