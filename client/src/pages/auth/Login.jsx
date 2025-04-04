import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // we need to have some values from the authContext

  const { setToken, setUser, setIsAuthenticated, apiUrl } = useAuth();

  // handleChange function

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handleLogin
  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.status === 200 && data.token) {
        toast.success("Login Successful!");
        setTimeout(() => {
          localStorage.setItem("expensetc_token", data.token);
          localStorage.setItem("expensetc_user", JSON.stringify(data.user));
          setToken(data.token);
          setIsAuthenticated(true);
          setUser(data.user);
          navigate("/expenseboard");
        }, 2000);
      } else {
        toast.error("Invalid credentials! Try again.");
      }

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error("Login failed! Try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={(e) => handleInputChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={(e) => handleInputChange(e)}
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <p>
          New user? <Link to="/register">register now</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
