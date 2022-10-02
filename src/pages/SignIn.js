import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../components/error";
import Input from "../components/Input";
import Button from "../components/Button";
import signInLogo from "../common/images/signInLogo.svg";
import "../common/css/pages/signin.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({});
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const userInputHandler = (event) => {
    if (event.target.name === "username") {
      setUserInput({ ...userInput, username: event.target.value });
    } else {
      setUserInput({ ...userInput, password: event.target.value });
    }
  };

  const showErrorHandler = () =>{
      setShowError(false)
  }

  const onSubmitHandler = async (event) => {
    setShowError(false)
    let response;
    event.preventDefault();
    try {
      response = await axios.post(
        "http://192.168.1.153:8080/api/v1/sign-in",
        userInput
      );

      console.log(response.data)
      
      navigate("/chat");
    } catch (error) {
      setShowError(true)
      setError(error.response.data.message)
      console.log(error.response.data)
      
    }
  };


  return (
    <div className="container">
    <Error message={error} showErrorHandler={showErrorHandler } showError={showError} />
      <div className="signInContainer">
        <div className="logoContainer">
          <img src={signInLogo} alt="sign in logo" />
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className="form_input">
            <Input
              type="text"
              name="username"
              placeholder="Username"
              userInputHandler={userInputHandler}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              userInputHandler={userInputHandler}
            />
          </div>
          <div className="button">
            <Button title="Login" buttonType="primary" />
          </div>

          <p style={{ marginTop: "30px" }}>
            Or{" "}
            <Link to="/sign-up">
              <span>create an account</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
