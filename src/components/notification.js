import { useSelector, useDispatch } from "react-redux";
import { setShowInfo } from "../store/slices/notificationSlice";
import CloseIcon from "@mui/icons-material/Close";
import "../common/css/component/notification.css";

const Notification = () => {
const dispatch = useDispatch()
const showInfo = useSelector(state => state.notification.showInfo)
const message = useSelector(state => state.notification.message)

  return (
    <>
      {showInfo && (
        <div className="notification_container">
          <p>Info: {message}</p>
          <div onClick={() => dispatch(setShowInfo(false))} className="notification_close">
            <CloseIcon sx={{fontWeight:"800"}} />
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;