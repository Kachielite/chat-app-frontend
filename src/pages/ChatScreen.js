import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../store/slices/authSlice";
import { setMessage, setShowInfo } from "../store/slices/notificationSlice";
import {
  setShowInAppToast,
  setToastMessage,
} from "../store/slices/inChatNotificationSlice";
import axios from "axios";
import io from "socket.io-client";
import Options from "../components/options";
import ChatBubble from "../components/chatBubble";
import InChatNotification from "../components/inChatNotification";
import Avatar from "@mui/material/Avatar";
import useWindowDimensions from "../utils/useWindowsDimensions";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ChatLogo from "../common/images/chatLogo.svg";
import { setOnlineUser } from "../store/slices/userSlice";
import Menu from "../common/images/menusvg.svg";
import "../common/css/pages/chat.css";

const socket = io(`${process.env.REACT_APP_ENDPOINT}`);

const ChatScreen = () => {
  const IP = `${process.env.REACT_APP_ENDPOINT}`;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timeToExpire = useSelector((state) => state.auth.timeToExpire);
  const onlineUsers = useSelector((state) => state.user.onlineUsers);
  const [sideBarVisibility, setSideBarVisibility] = useState(false);
  const [settingsVisibility, setSettingsVisibility] = useState(false);
  const [closeOptions, setCloseOptions] = useState(false);
  const [chat, setChat] = useState({ message: "", userId: "" });
  const [messages, setMessages] = useState();
  const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setUserTying] = useState("");
  const { width } = useWindowDimensions();
  const user = localStorage.getItem("user");
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

  const logOutHandler = async () => {
    try {
      //Get All Online Users
      const response = await axios.get(`${IP}/api/v1/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setOnlineUser(response.data.users));
      try {
        //Tell the server that the user has left the chatroom
        socket.emit("left", JSON.parse(user));
        dispatch(setAuth(false));
        localStorage.removeItem("token");
        localStorage.removeItem("expiryDate");
        localStorage.removeItem("user");
        navigate("/sign-in");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const chatOnChangeHandler = (event) => {
    setChat({ ...chat, message: event.target.value });
    socket.emit("typing", JSON.parse(user));
  };

  const postChatHandler = async () => {
    if (chat.message.length === 0) {
      return;
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = { ...chat, userId: user.userId };
    axios
      .post(`${IP}/api/v1/post-chat`, data, config)
      .then((response) => {
        setChat({ ...chat, message: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    socket.on("connect", () => {});

    socket.on("disconnect", () => {});
    //The socket is a module that exports the actual socket.io socket
    socket.on("new chat", (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("message", (user) => {
      dispatch(setShowInAppToast(true));
      dispatch(setToastMessage(`${user.username} joined the chatroom`));
      setTimeout(() => {
        dispatch(setShowInAppToast(false));
      }, 7000);
    });

    socket.on("leftChatroom", (user) => {
      dispatch(setShowInAppToast(true));
      dispatch(setToastMessage(`${user.username} left the chatroom`));
      setTimeout(() => {
        dispatch(setShowInAppToast(false));
      }, 4000);
    });

    socket.on("is-typing", (username) => {
      setIsTyping(true);
      setUserTying(username);
      setTimeout(() => {
        setIsTyping(false);
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
      socket.off("leftChatroom");
      socket.off("is-typing");
    };
  }, [dispatch, token]);

  useEffect(() => {
    //Get All Chats messages
    axios
      .get(`${IP}/api/v1/get-chats`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMessages(response.data.chats);
      })
      .catch((err) => {
        console.log(err);
      });
    //Get All Online Users
    axios
      .get(`${IP}/api/v1/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(setOnlineUser(response.data.users));
      })
      .catch((err) => {
        console.log(err);
      });
    //Notify the server that a new user has joined
    socket.emit("join", JSON.parse(user));
  }, [token, user, dispatch,IP]);

  useEffect(() => {
    const logoutAction = () => {
      dispatch(
        setOnlineUser([
          ...onlineUsers.filter(
            (onlineUser) => onlineUser.username !== user.username
          ),
        ])
      );
      navigate("/sign-in");
      //Tell the server that the user has left the chatroom
      socket.emit("left", JSON.parse(user));
      dispatch(setAuth(false));
      localStorage.removeItem("token");
      localStorage.removeItem("expiryDate");
      localStorage.removeItem("user");
    };
    const autoLogOut = setTimeout(() => {
      logoutAction();
      dispatch(setShowInfo(true));
      dispatch(setMessage("Session has expired. Please login again"));
    }, timeToExpire);

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
                {onlineUsers &&
                  onlineUsers?.map((user, index) => {
                    return (
                      <div className="online_user_item" key={index}>
                        {user.display_picture_url === "" ||
                        !user.display_picture_url ? (
                          <AccountCircleIcon
                            sx={{
                              fontSize: width < 480 ? "40px" : "50px",
                              marginRight: width < 480 ? "20px" : "50px",
                              marginLeft: width < 480 ? "30px" : "50px",
                            }}
                          />
                        ) : (
                          <Avatar
                            alt={user.username}
                            src={user.display_picture_url}
                            sx={{
                              fontSize: width < 480 ? "30px" : "50px",
                              marginRight: width < 480 ? "20px" : "30px",
                              marginLeft: width < 480 ? "30px" : "50px",
                            }}
                          />
                        )}
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
            {isTyping && (
              <p
                id="isTyping"
                style={{
                  color: "white",
                  fontSize: "15px",
                  marginRight: width < 480 ? "" : "400px",
                }}>
                {`${userTyping} is typing`}
              </p>
            )}
            <div
              className="settings_container"
              onClick={settingsVisibilityHandler}>
              {JSON.parse(user).profile_photo ? (
                <img
                  src={JSON.parse(user).profile_photo}
                  alt="user_image"
                  height={40}
                  width={40}
                  style={{ borderRadius: "50%" }}
                />
              ) : (
                <AccountCircleIcon
                  sx={{
                    fontSize: width < 480 ? "40px" : "50px",
                    marginRight: "20px",
                  }}
                />
              )}
              <div className="settings_button">
                <SettingsOutlinedIcon
                  sx={{ fontSize: width < 480 ? "20px" : "25px" }}
                />
              </div>
              {settingsVisibility && (
                <div className="settings">
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
