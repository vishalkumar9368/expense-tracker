import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TransactionProvider } from "./context/TransactionContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <TransactionProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </TransactionProvider>
    </AuthProvider>
  </BrowserRouter>
);
