import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  return localStorage.getItem("accessToken") ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
};

export default ProtectedRoute;
