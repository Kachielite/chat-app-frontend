import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/slices/authSlice";

export const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");
  let expiryDate = localStorage.getItem("expiryDate");

  if (!userId && !token && expiryDate <= new Date()) {
    dispatch(setAuth(false));
    return <Navigate to="/sign-in" />;
  } else {
    dispatch(setAuth(true));
    return children;
  }
};
