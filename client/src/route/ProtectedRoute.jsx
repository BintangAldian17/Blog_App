import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const currentUser = localStorage.getItem("user");
  if (!currentUser) return <Navigate to="/login" />;
  return children;
};
