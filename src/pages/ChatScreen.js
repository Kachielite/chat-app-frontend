import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../store/slices/authSlice";
import { setMessage, setShowInfo } from "../store/slices/notificationSlice";
import { setShowInAppToast, setToastMessage } from "../store/slices/inChatNotificationSlice";
import axios from "axios";
import io from "socket.io-client";
import Options from "../components/options";
import ChatBubble from "../components/chatBubble";
import InChatNotification from "../components/inChatNotification";
import useWindowDimensions from "../utils/useWindowsDimensions";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ChatLogo from "../common/images/chatLogo.svg";
import { getUserDetails } from "../store/slices/userSlice";
import Menu from "../common/images/menusvg.svg";
import "../common/css/pages/chat.css";

const socket = io("http://192.168.1.153:8080");

const ChatScreen = () => {
  const IP = "192.168.1.153";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timeToExpire = useSelector((state) => state.auth.timeToExpire);
  const userDetails = useSelector((state) => state.user.userInfo);
  const [sideBarVisibility, setSideBarVisibility] = useState(false);
  const [settingsVisibility, setSettingsVisibility] = useState(false);
  const [closeOptions, setCloseOptions] = useState(false);
  const [users, setUsers] = useState({});
  const [chat, setChat] = useState({ message: "", userId: "" });
  const [messages, setMessages] = useState();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const { width } = useWindowDimensions();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const messageEl = useRef(null);

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

  const logOutHandler = () => {
    dispatch(setAuth(false));
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    navigate("/sign-in");
    socket.emit("left", userDetails.username);
  };

  const chatOnChangeHandler = (event) => {
    setChat({ ...chat, message: event.target.value });
  };

  const postChatHandler = async () => {
    if (chat.message.length === 0) {
      return;
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = { ...chat, userId: userId };
    axios
      .post(`http://${IP}:8080/api/v1/post-chat`, data, config)
      .then((response) => {
        setChat({ ...chat, message: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      
    });
    //The socket is a module that exports the actual socket.io socket
    socket.on("new chat", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("message", (data) => {
      dispatch(setShowInAppToast(true));
      dispatch(setToastMessage(`${data} joined the chatrrom`));
      setTimeout(() => {
        dispatch(setShowInAppToast(false));
      }, 7000);
    });

    socket.on("leftChatroom", (data) => {
      dispatch(setShowInAppToast(true));
      dispatch(setToastMessage(`${data} left the chatroom`));
      setTimeout(() => {
        dispatch(setShowInAppToast(false));
      }, 7000);
    });


    //Pull Messages window to the bottom to view the most recent message
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }

    return () => {
      // turning of socket listener on unmount
      socket.off("connect");
      socket.off("disconnect");
      socket.off("new chat");
      socket.off("message");
      socket.off("left chatroom");
    };
  }, []);

  useEffect(() => {
    //Get All users on the platform
    axios
      .get(`http://${IP}:8080/api/v1/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
    //Get All Chats messages
    axios
      .get(`http://${IP}:8080/api/v1/get-chats`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMessages(response.data.chats);
      })
      .catch((err) => {
        console.log(err);
      });
    //Get User details
    axios
      .get(`http://${IP}:8080/api/v1/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(getUserDetails(response.data.user));
        socket.emit("join", userDetails.username);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, userId, dispatch, userDetails.username]);

  useEffect(() => {
    const autoLogOut = setTimeout(logOutHandler, timeToExpire);
    dispatch(setShowInfo(true));
    dispatch(setMessage("Session has expired. Please login again"));

    return () => clearTimeout(autoLogOut);
  });

  return (
    <>
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
        <InChatNotification />
          <div className="navbar">
            {width < 1024 && (
              <img
                src={Menu}
                alt="menu"
                onClick={sideBarVisibilityHandler}
                style={{ height: "30px" }}
              />
            )}
            {/* <p>is typing</p> */}
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
          <div className="chat" ref={messageEl}>
            <ChatBubble messages={messages} />
          </div>
          <div className="chat_input">
            <input
              type="text"
              name="chat"
              placeholder=" Type your message here..."
              onChange={chatOnChangeHandler}
              value={chat.message}
            />
            <div className="button" onClick={postChatHandler}>
              <SendIcon sx={{ fontSize: width < 480 ? "30px" : "50px" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatScreen;
