import CloseIcon from "@mui/icons-material/Close";
import "../common/css/component/error.css";

const Error = ({ message, showError, showErrorHandler }) => {
  return (
    <>
      {showError && (
        <div className="error_container">
          <p>Error: {message}</p>
          <div onClick={showErrorHandler} className="error_close">
            <CloseIcon sx={{fontWeight:"800"}} />
          </div>
        </div>
      )}
    </>
  );
};

export default Error;
