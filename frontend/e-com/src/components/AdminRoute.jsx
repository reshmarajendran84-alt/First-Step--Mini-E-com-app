import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function AdminRoute({ children }) {
  const { role } = useContext(AuthContext);

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
}
