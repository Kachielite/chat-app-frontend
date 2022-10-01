import { useState } from "react";
import Options from "../components/options";
import useWindowDimensions from "../utils/useWindowsDimensions";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ChatLogo from "../common/images/chatLogo.svg";
import Menu from "../common/images/menusvg.svg";
import "../common/css/pages/chat.css";

const ChatScreen = () => {
  const [sideBarVisibility, setSideBarVisibility] = useState(false);
  const [settingsVisibility, setSettingsVisibility] = useState(false);
  const [closeOptions, setCloseOptions] = useState(false);
  const { width } = useWindowDimensions();

  const closeOptionsHandler = () => {
    setCloseOptions(true);
  };

  const sideBarVisibilityHandler = () => {
    if (!sideBarVisibility) {
      setSideBarVisibility(true);
    } else {
      setSideBarVisibility(false);
    }
    setSettingsVisibility(false);
  };

  const settingsVisibilityHandler = () => {
    if (!settingsVisibility) {
      setSettingsVisibility(true);
    } else {
      setSettingsVisibility(false);
    }
    setSideBarVisibility(false);
  };

  

  return (
    <div className="chat_screen_container">
      {closeOptions && (
        <Options width={width} setCloseOptions={setCloseOptions} />
      )}
      {(width > 1024 || sideBarVisibility) && (
        <div className="sidebar">
          {width < 1024 && (
            <div className="close" onClick={sideBarVisibilityHandler}>
              <CloseIcon fontSize="medium" />
            </div>
          )}
          <div className="chat_logo_container">
            <img src={ChatLogo} alt="chat logo" />
          </div>
          <div className="online_users_container">
            <div className="online_user">
              <div className="online_user_item">
                <AccountCircleIcon
                  sx={{
                    fontSize: width < 480 ? "30px" : "50px",
                    marginRight: width < 480 ? "30px" : "50px",
                    marginLeft: width < 480 ? "30px" : "50px",
                  }}
                />
                <p>Shella</p>
              </div>
              <div className="online_user_item">
                <AccountCircleIcon
                  sx={{
                    fontSize: width < 480 ? "30px" : "50px",
                    marginRight: width < 480 ? "30px" : "50px",
                    marginLeft: width < 480 ? "30px" : "50px",
                  }}
                />
                <p>Shella</p>
              </div>
              <div className="online_user_item">
                <AccountCircleIcon
                  sx={{
                    fontSize: width < 480 ? "30px" : "50px",
                    marginRight: width < 480 ? "30px" : "50px",
                    marginLeft: width < 480 ? "30px" : "50px",
                  }}
                />
                <p>Shella</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="chat_section">
        <div className="navbar">
          {width < 1024 && (
            <img
              src={Menu}
              alt="menu"
              onClick={sideBarVisibilityHandler}
              style={{ height: "30px", marginLeft: "10px" }}
            />
          )}
          <div
            className="settings_container"
            onClick={settingsVisibilityHandler}>
            <AccountCircleIcon
              sx={{
                fontSize: width < 480 ? "40px" : "50px",
                marginRight: "20px",
              }}
            />
            <div className="settings_button">
              <SettingsOutlinedIcon />
            </div>
            {settingsVisibility && (
              <div className="settings">
                {/* <div className="settings_item">
                <PersonOutlineOutlinedIcon
                  sx={{ fontSize: width < 480 ? "20px" : "30px" }}
                />
                <p>Profile</p>
              </div> */}
                <div className="settings_item" onClick={closeOptionsHandler}>
                  <SettingsOutlinedIcon
                    sx={{ fontSize: width < 480 ? "20px" : "30px" }}
                  />
                  <p>Setting</p>
                </div>
                <div className="settings_item">
                  <LogoutOutlinedIcon
                    sx={{ fontSize: width < 480 ? "20px" : "30px" }}
                  />
                  <p>Log Out</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="chat"></div>
        <div className="chat_input">
          <input
            type="text"
            name="chat"
            placeholder=" Type your message here..."
          />
          <div className="button">
            <SendIcon sx={{ fontSize: width < 480 ? "30px" : "50px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
