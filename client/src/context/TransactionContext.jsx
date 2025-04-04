import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  // state to store the all transactions
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const { token, isAuthenticated } = useAuth();

  // whenever the user is authenticated then only make a request
  useEffect(() => {
    if (isAuthenticated) {
      fetchTransactions();
    }
  }, [isAuthenticated]);

  // function to fetch all transactions

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/transaction", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // delte a transaction
  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/transaction/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        setTransactions(transactions.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function to add a expense or income
  const addTransaction = async (formData) => {
    try {
      const response = await fetch(`http://localhost:3000/user/transaction`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.status !== 200) {
        return;
      }

      setTransactions([...transactions, data.savedTransaction]);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  // calculating income and expenses
  useEffect(() => {
    // calculate total income

    const newIncome = transactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0);

    // calculate total expense

    const newExpense = transactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);

    // benefit of creating new states is this we will get correct balance every time we run this effect
    setIncome(newIncome);
    setExpense(newExpense);
    setBalance(newIncome - newExpense);
  }, [transactions]);

  return (
    <TransactionContext.Provider
      value={{
        fetchTransactions,
        transactions,
        deleteTransaction,
        addTransaction,
        income,
        expense,
        balance,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);
