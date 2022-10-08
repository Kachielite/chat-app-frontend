import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useFilePicker } from 'use-file-picker';
import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import "../common/css/component/options.css";

const Options = ({ width, setCloseOptions }) => {
  const IP = "192.168.1.153";
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [user, setUser] = useState({name:"", displayPicture:""});
  const [updatedUserInfo, setUpdatedUserInfo] = useState({name:"", password:"", confirmPassword:"", file:""})
  const inputFile = useRef(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: true,
    limitFilesConfig: { max: 1 },
    // minFileSize: 0.1, // in megabytes
    maxFileSize: 50,
    imageSizeRestrictions: {
      maxHeight: 900, // in pixels
      maxWidth: 1600,
      minHeight: 600,
      minWidth: 768,
    },
  });




  

  const onChageInputHandler = (event) =>{
    if(event.target.name === "name"){
      setUpdatedUserInfo({...updatedUserInfo, name: event.target.value})
    } 
    if(event.target.name === "password"){
      setUpdatedUserInfo({...updatedUserInfo, password: event.target.value})
    } 
    if(event.target.name === "confirmPassword"){
      setUpdatedUserInfo({...updatedUserInfo, confirmPassword: event.target.value})
    } 
  }

  

  const updateProfileHandler = (event) =>{
    event.preventDefault();
    setUpdatedUserInfo({...updatedUserInfo, file: filesContent.content})
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = updatedUserInfo
    axios
      .put(`http://${IP}:8080/api/v1/update-user-data`, 
        data,
        config,
      )
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  
  useEffect(() => {
    axios
      .get(`http://${IP}:8080/api/v1/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser({
          name: response.data.name,
          displayPicture: response.data.displayPicture,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, userId]);

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
        {!user?.displayPicture ? 
          <AccountCircleIcon
            sx={{
              fontSize: "300px",
            }}
          />
          :
          <img src={updatedUserInfo.file.length > 0 ? updatedUserInfo.file.content : user.displayPicture} alt={user.name}/>
        }
        <button className="edit_button" onClick={() => openFileSelector()}>
          <EditIcon
            sx={{
              fontSize: width < 480 ? "40px" : "40px",
            }}
          />
        </button>
      </div>

      <form onSubmit={updateProfileHandler}>
        <div className="form_input">
          <input type="text" name="name" placeholder="Name"  onChange={onChageInputHandler}/>
          <AccountCircleIcon />
        </div>
        <div className="form_input">
          <input type={passwordType} name="password" placeholder="Password" onChange={onChageInputHandler}/>
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
  );
};

export default Options;
