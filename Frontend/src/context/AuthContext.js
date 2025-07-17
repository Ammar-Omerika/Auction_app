import { createContext, useState, useEffect } from "react";

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
      const res = await fetch("http://localhost:8080/api/v1/auth/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Loginfailed");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      const payload = JSON.parse(atob(data.token.split('.')[1]));
      const email = payload.sub;

      localStorage.setItem("username", email);
      setUsername(email);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const register = async (form) => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Register failed");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      const payload = JSON.parse(atob(data.token.split('.')[1]));
      const email = payload.sub;

      localStorage.setItem("username", email);
      setUsername(email);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err.message);
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
