import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/slices/authSlice";
import axios from "axios";
import Options from "../components/options";
import ChatBubble from "../components/chatBubble";
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
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [sideBarVisibility, setSideBarVisibility] = useState(false);
  const [settingsVisibility, setSettingsVisibility] = useState(false);
  const [closeOptions, setCloseOptions] = useState(false);
  const [users, setUsers] = useState({});
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

  const logOutHandler = () =>{
    dispatch(setAuth(false))
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    navigate('/sign-in')
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/api/v1/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

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
              {false &&
                users?.map((user, index) => {
                  return (
                    <div className="online_user_item">
                      <AccountCircleIcon
                        sx={{
                          fontSize: width < 480 ? "30px" : "50px",
                          marginRight: width < 480 ? "30px" : "50px",
                          marginLeft: width < 480 ? "30px" : "50px",
                        }}
                      />
                      <p>{user.username}</p>
                    </div>
                  );
                })}
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
              style={{ height: "30px" }}
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
                <div className="settings_item" onClick={logOutHandler}>
                  <LogoutOutlinedIcon
                    sx={{ fontSize: width < 480 ? "20px" : "30px" }}
                  />
                  <p>Log Out</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="chat">
          <ChatBubble />
        </div>
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
