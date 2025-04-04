import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // handle input change

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle Register
  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong! try aagain.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={(e) => handleInputChange(e)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleInputChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleInputChange(e)}
        />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
        <p>
          Existing user? <Link to="/login">Login</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
