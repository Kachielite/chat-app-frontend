import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/slices/authSlice";
import { setShowInfo, setMessage } from "../store/slices/notificationSlice";

export const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");
  let expiryDate = localStorage.getItem("expiryDate");

  if (!userId && !token && expiryDate <= new Date()) {
    dispatch(setAuth(false));
    dispatch(setMessage('You must login to access the chat room'))
    dispatch(setShowInfo(true))
    return <Navigate to="/sign-in" />;
  } else {
    dispatch(setAuth(true));
    return children;
  }
};
