import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const savedToken = localStorage.getItem("token");

    if (savedRole) setRole(savedRole);
    if (savedToken) setToken(savedToken);
  }, []);

  const login = (userRole, userToken) => {
    setRole(userRole);
    setToken(userToken);

    localStorage.setItem("role", userRole);
    localStorage.setItem("token", userToken);
  };

  const logout = () => {
    setRole(null);
    setToken(null);

    localStorage.removeItem("role");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
