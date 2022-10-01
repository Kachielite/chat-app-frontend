import { useState } from "react";
import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import "../common/css/component/options.css";

const Options = ({ width, setCloseOptions }) => {
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const passwordTypeHandler = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else {
      setPasswordType("text");
    }
  };
  const confirmPasswordTypeHandler = () => {
    if (confirmPasswordType === "text") {
      setConfirmPasswordType("password");
    } else {
      setConfirmPasswordType("text");
    }
  };
  return (
    <div className="options_container">
      <div className="close_options" onClick={() => setCloseOptions(false)}>
        <ArrowBackIosSharpIcon
          sx={{
            fontSize: width < 480 ? "30px" : "40px",
            marginRight: "20px",
          }}
        />
      </div>

        <div className="profile_photo_container">
          <AccountCircleIcon
            sx={{
              fontSize: "300px",
        
            }}
          />
          <div className="edit_button">
            <EditIcon
              sx={{
                fontSize: width < 480 ? "45px" : "50px",
              }}
            />
          </div>
        </div>

        <form action="">
          <div className="form_input">
            <input type="text" name="name" placeholder="Name" />
            <AccountCircleIcon />
          </div>
          <div className="form_input">
            <input type={passwordType} name="password" placeholder="Password" />
            <div onClick={passwordTypeHandler}>
              {passwordType === "text" ? (
                <VisibilityOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
            </div>
          </div>
          <div className="form_input">
            <input
              type={confirmPasswordType}
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            <div onClick={confirmPasswordTypeHandler}>
              {confirmPasswordType === "text" ? (
                <VisibilityOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
            </div>
          </div>
          <button type="submit">Update</button>
        </form>
    </div>
  );
};

export default Options;
