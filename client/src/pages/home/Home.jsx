import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { FaWallet, FaHistory, FaTable } from "react-icons/fa";

const Home = () => {
  return (
    <div>
      <section className="hero">
        <h1>Simple & Smart Expense Tracker</h1>
        <p>Track your income, expenses, and balance effortlessly.</p>
        <Link to="/expenseboard">
          <button>Start Tracking</button>
        </Link>
      </section>
      <section className="features">
        <div className="feature">
          <p className="icon">
            <FaTable />
          </p>
          <p>Easily record income and expenses in one place.</p>
        </div>
        <div className="feature">
          <p className="icon">
            <FaWallet />
          </p>
          <p>See your current balance at a glance.</p>
        </div>
        <div className="feature">
          <p className="icon">
            <FaHistory />
          </p>
          <p>View your past transactions and analyze spending patterns.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
