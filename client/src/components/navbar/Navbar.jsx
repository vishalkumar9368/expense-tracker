import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  return (
    <nav>
      <div className="logo">
        <Link to="/">XPense</Link>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* we dont nee to show these if user logged in */}

        {isAuthenticated ? (
          <>
            <li>
              <Link to="/expenseboard">Expense Board</Link>
            </li>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
