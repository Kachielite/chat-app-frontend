import { useSelector } from "react-redux";
import "../common/css/component/inChatNotification.css";

const InChatNotification = () => {

const showInAppToast = useSelector(state => state.inChat.showInAppToast)
const toastMessage = useSelector(state => state.inChat.toastMessage)

  return (
    <>
      {showInAppToast && (
        <div className="inChatNotification_container">
          <p>{toastMessage}</p>
        </div>
      )}
    </>
  );
};

export default InChatNotification;