import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // in auth context we need to save token,user and flags like isAuthenticated

  const [token, setToken] = useState(
    localStorage.getItem("expensetc_token") || null
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("expensetc_user")) || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!token); // Ensure it's always a boolean

  // logout function
  const logout = () => {
    localStorage.removeItem("expensetc_token");
    localStorage.removeItem("expensetc_user");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // function to check the token expiration
  const isTokenExpired = () => {
    try {
      // Decode JWT
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      // Convert expiry to milliseconds
      const expiry = tokenData.exp * 1000;
      // Check if token is expired
      return expiry < Date.now();
    } catch (error) {
      // If error, consider token invalid
      return true;
    }
  };

  // Check token validity on component mount - only run when user refresh

  useEffect(() => {
    if (token && isTokenExpired()) {
      console.log("Token expired. Logging out...");
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
