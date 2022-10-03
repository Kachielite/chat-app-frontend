import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../components/error";
import { BallTriangle } from "react-loader-spinner";
import Button from "../components/Button";
import signInLogo from "../common/images/signInLogo.svg";
import "../common/css/pages/signin.css";
import "../common/css/component/input.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({});
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const userInputHandler = (event) => {
    if (event.target.name === "username") {
      setUserInput({ ...userInput, username: event.target.value });
    } else {
      setUserInput({ ...userInput, password: event.target.value });
    }
  };

  const showErrorHandler = () => {
    setShowError(false);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setShowError(false);
    if (userInput.username.length === 0) {
      setLoading(false);
      setError("Username is required");
      setShowError(true);
      return;
    } else if (userInput.password.length === 0) {
      setLoading(false);
      setError("Password is required");
      setShowError(true);
      return;
    } else {
    }

    try {
      const response = await axios.post(
        "http://192.168.1.153:8080/api/v1/sign-in",
        userInput
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(
        new Date().getTime() + remainingMilliseconds
      );
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      setLoading(false);
      navigate("/chat");
    } catch (error) {
      setLoading(false);
      setShowError(true);
      setError(error.response.data.message);
      console.log(error.response.data);
    }
  };

  return (
    <>
      {loading ? (
        <div className="container">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#1162E0"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      ) : (
        <div className="container">
          <Error
            message={error}
            showErrorHandler={showErrorHandler}
            showError={showError}
          />
          <div className="signInContainer">
            <div className="logoContainer">
              <img src={signInLogo} alt="sign in logo" />
            </div>
            <form onSubmit={onSubmitHandler}>
              <div className="form_input">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={userInputHandler}
                  className={error.includes("User") ? "error" : ""}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={userInputHandler}
                  className={error.includes("Password") ? "error" : ""}
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
      )}
    </>
  );
};

export default SignIn;
