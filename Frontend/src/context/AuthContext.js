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

  const login = async (form, isRegister = false) => {
    const endpoint = isRegister
      ? "http://localhost:8080/api/v1/auth/register"
      : "http://localhost:8080/api/v1/auth/authenticate";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Login/Register failed");
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
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
