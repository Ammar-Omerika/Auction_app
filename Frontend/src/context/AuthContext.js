import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const login = async (form) => {
    try {
      const res = await axios.post("/auth/authenticate", form, {
        headers: { "Content-Type": "application/json" },
      });

      const data = res.data;
      localStorage.setItem("token", data.token);

      const payload = JSON.parse(atob(data.token.split('.')[1]));
      const email = payload.sub;

      localStorage.setItem("username", email);
      setUsername(email);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      throw err; 
    }
  };

  const register = async (form) => {
    try {
      const res = await axios.post("/auth/register", form, {
        headers: { "Content-Type": "application/json" },
      });

      const data = res.data;
      localStorage.setItem("token", data.token);

      const payload = JSON.parse(atob(data.token.split('.')[1]));
      const email = payload.sub;

      localStorage.setItem("username", email);
      setUsername(email);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Register failed:", err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
