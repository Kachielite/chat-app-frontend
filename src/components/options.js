import { useState } from "react";
import axios from "axios";
import { useFilePicker } from "use-file-picker";
import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import { BallTriangle } from "react-loader-spinner";
import "../common/css/component/options.css";

const Options = ({ width, setCloseOptions }) => {
  const IP = `${process.env.REACT_APP_ENDPOINT}`;
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const token = localStorage.getItem("token");

  const [openFileSelector, { filesContent }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
  });

  const onChageInputHandler = (event) => {
    if (event.target.name === "name") {
      setUser({ ...user, name: event.target.value });
    }
    if (event.target.name === "password") {
      setUser({ ...user, password: event.target.value });
    }
    if (event.target.name === "confirmPassword") {
      setUser({ ...user, confirmPassword: event.target.value });
    }
  };

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

  const updateProfileHandler = (event) => {
    event.preventDefault();
    setLoading(true)
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = { ...user, profile_photo: filesContent[0]?.content };
    axios
      .put(`${IP}/api/v1/update-user-data`, data, config)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(user));
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {loading ? (
        <div className="loader_container">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#FFFF"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      ) : (
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
            <div className="profile_photo">
              {filesContent[0]?.content ? (
                <img
                  src={filesContent[0]?.content}
                  alt={user.username}
                  height={100}
                  width={100}
                />
              ) : user.profile_photo === "" ? (
                <AccountCircleIcon
                  sx={{
                    fontSize: "300px",
                  }}
                />
              ) : (
                <img
                  src={user.profile_photo}
                  alt={user.username}
                  height={40}
                  width={40}
                />
              )}
            </div>
            <button className="edit_button" onClick={() => openFileSelector()}>
              <EditIcon
                sx={{
                  fontSize: width < 480 ? "30px" : "40px",
                }}
              />
            </button>
          </div>

          <form onSubmit={updateProfileHandler}>
            <div className="form_input">
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={onChageInputHandler}
              />
              <AccountCircleIcon />
            </div>
            <div className="form_input">
              <input
                type={passwordType}
                name="password"
                placeholder="Password"
                onChange={onChageInputHandler}
              />
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
                onChange={onChageInputHandler}
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
      )}
    </>
  );
};

export default Options;
