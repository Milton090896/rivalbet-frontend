import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("user"); // simula login
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
