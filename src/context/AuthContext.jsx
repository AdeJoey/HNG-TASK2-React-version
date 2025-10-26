import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("ticketapp_session");
    if (token) {
      const user = JSON.parse(localStorage.getItem("ticketapp_user"));
      setIsAuthenticated(true);
      setCurrentUser(user);
    }
  }, []);

  const login = (email, password) => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
    
    // Check for test user (backward compatibility)
    if (email === "testuser@example.com" && password === "password123") {
      const user = { email };
      setIsAuthenticated(true);
      setCurrentUser(user);
      localStorage.setItem("ticketapp_session", "true");
      localStorage.setItem("ticketapp_user", JSON.stringify(user));
      return true;
    }

    // Check registered users
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser({ email: user.email });
      localStorage.setItem("ticketapp_session", "true");
      localStorage.setItem("ticketapp_user", JSON.stringify({ email: user.email }));
      return true;
    }

    return false;
  };

  const signup = (email, password) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
      return false;
    }

    // Add new user
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("ticketapp_users", JSON.stringify(users));

    // Auto-login after signup
    setIsAuthenticated(true);
    setCurrentUser({ email });
    localStorage.setItem("ticketapp_session", "true");
    localStorage.setItem("ticketapp_user", JSON.stringify({ email }));
    
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("ticketapp_session");
    localStorage.removeItem("ticketapp_user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);