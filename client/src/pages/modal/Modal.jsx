import React, { useState } from "react";
import { useTransaction } from "../../context/TransactionContext";
import "./Modal.css";

const Modal = ({ setIsModalOpen, type }) => {
  // state to collect the form data
  const [formData, setFormData] = useState({
    type,
    category: "",
    amount: "", // Change null to ""
    description: "",
  });
  // state for error
  const [error, setError] = useState("");
  const { addTransaction, balance } = useTransaction();

  // function to handle input change
  // e.target.value is always a string e.target.value

  // const handleInputChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "amount" ? (value === "" ? "" : Number(value)) : value, // Convert amount to number
    });
  };

  //
  const handleAddTransaction = () => {
    if (!formData.amount) {
      setError("Please add a valid amount.");
    } else if (!formData.category) {
      setError("Please select a category");
    } else if (type === "expense" && formData.amount > balance) {
      setError("Expense cant be greater then balance.");
    } else {
      addTransaction(formData);
      setIsModalOpen(false);
      setFormData({
        // since type is a prop keep it as it is
        type,
        category: "",
        amount: "",
        description: "",
      });
    }
  };

  // console.log(formData);
  return (
    <div className="modal-container">
      <div className="modal">
        <h1>Add {type === "income" ? "Income" : "Expense"}</h1>
        <input
          type="number"
          placeholder="Enter Amount"
          className="modal-input-field "
          value={formData.amount}
          name="amount"
          onChange={handleInputChange}
        />
        {type.toLowerCase() === "expense" ? (
          <select
            id=""
            className="modal-input-field"
            name="category"
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            <option value="Food & Dining">Food & Dining</option>
            <option value="Transportation">Transportation</option>
            <option value="Housing & Rent">Housing & Rent</option>
            <option value="Healthcare & Medical">Healthcare & Medical</option>
            <option value="Shopping">Shopping</option>
            <option value="Education">Education</option>
            <option value="Insurance">Insurance</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        ) : (
          <select
            id=""
            className="modal-input-field"
            name="category"
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            <option value="Salary">Salary</option>
            <option value="Freelance Work">Freelance Work</option>
            <option value="Business Income">Business Income</option>
            <option value="Investments">Investments</option>
            <option value="Rental Income">Rental Income</option>
            <option value="Side Hustlen">Side Hustle</option>
            <option value="Others">Others</option>
          </select>
        )}
        <input
          type="text"
          placeholder="Description"
          className="modal-input-field"
          value={formData.description}
          name="description"
          onChange={handleInputChange}
        />
        <p className="error">{error}</p>
        <div className="modal-btns-container">
          <button
            onClick={() => setIsModalOpen(false)}
            className="modal-btns close"
          >
            Close
          </button>
          <button
            onClick={handleAddTransaction}
            className={`modal-btns ${
              type === "income" ? "addIncome" : "addExpense"
            }`}
          >
            Add {type === "income" ? "Income" : "Expense"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
