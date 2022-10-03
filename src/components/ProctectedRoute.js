import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth.auth);
  if (!auth) {
    // user is not authenticated
    return <Navigate to="/sign-in" />;
  }
  return children;
};
