import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import ExpenseBoard from "./pages/expense/ExpenseBoard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./components/navbar/Navbar";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Protected route for ExpenseBoard */}
        <Route
          path="/expenseboard"
          element={
            isAuthenticated ? <ExpenseBoard /> : <Navigate to="/login" />
          }
        />

        {/* Redirect to Home if already logged in */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/expenseboard" /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/expenseboard" /> : <Register />
          }
        />
      </Routes>
    </>
  );
};

export default App;
