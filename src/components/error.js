import CloseIcon from "@mui/icons-material/Close";
import "../common/css/component/error.css";

const Error = ({ message, showError, showErrorHandler }) => {
  return (
    <>
      {showError && (
        <div className="error_container">
          <p>{message}</p>
          <div onClick={showErrorHandler} className="error_close">
            <CloseIcon />
          </div>
        </div>
      )}
    </>
  );
};

export default Error;
