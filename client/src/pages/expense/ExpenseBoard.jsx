import React from "react";
import "./ExpenseBoard.css";
import { FaMoneyBillWave, FaWallet } from "react-icons/fa";
import { useTransaction } from "../../context/TransactionContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import Modal from "../modal/Modal";

const ExpenseBoard = () => {
  const { transactions, deleteTransaction, income, expense, balance } =
    useTransaction();
  const { user } = useAuth();
  // console.log(transactions);
  // state to tact if modal is opem or close
  const [isModalOpen, setIsModalOpen] = useState(false);
  // state to set type of the transaction
  const [type, setType] = useState("");

  return (
    <div className="expense-board-container">
      <div className="expense-board">
        <div>
          <h1>Welcome {user.name}</h1>
          <p className="total-balance">Your Balance: Rs {balance}</p>
          <div className="total-income-expense-card">
            <div className="total-income-card">
              <div className="income-text">
                Income
                <span>
                  <FaWallet />
                </span>
              </div>
              <p>+ Rs {income}</p>
            </div>
            <div className="total-expense-card">
              <div className="expense-text">
                Expense
                <span>
                  <FaMoneyBillWave />
                </span>
              </div>
              <p>- Rs {expense}</p>
            </div>
          </div>
          <div className="income-expense-btns">
            <button
              className="income-btn"
              onClick={() => {
                setIsModalOpen(true);
                setType("income");
              }}
            >
              Add Income
            </button>
            <button
              className="expense-btn"
              onClick={() => {
                setIsModalOpen(true);
                setType("expense");
              }}
            >
              Add Expense
            </button>
          </div>
        </div>
        <div className="history-container">
          <h3>History</h3>
          <ul className="history">
            {transactions.map((item) => (
              <li key={item._id}>
                <span
                  className={item.type === "income" ? "income" : "expense"}
                ></span>
                <p className="amount">
                  {item.type === "income" ? "+" : "-"} Rs {item.amount}
                </p>
                <p className="description">{item.description}</p>

                <button
                  className="delete-btn"
                  onClick={() => deleteTransaction(item._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} type={type} />}
    </div>
  );
};

export default ExpenseBoard;
