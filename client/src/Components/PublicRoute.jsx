import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  return !localStorage.getItem("accessToken") ? (
    children
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default PublicRoute;
