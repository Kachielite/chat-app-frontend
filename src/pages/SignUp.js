import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../components/error";
import { BallTriangle } from "react-loader-spinner";
import Button from "../components/Button";
import signUpLogo from "../common/images/signUpLogo.svg";
import "../common/css/pages/signup.css";
import "../common/css/component/input.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const userInputHandler = (event) => {
    if (event.target.name === "name") {
      setUserInput({ ...userInput, name: event.target.value });
    } else if (event.target.name === "username") {
      setUserInput({ ...userInput, username: event.target.value });
    } else {
      setUserInput({ ...userInput, password: event.target.value });
    }
  };

  const showErrorHandler = () => {
    setShowError(false);
  };

  console.log(userInput);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setShowError(false);
    if (userInput.name.length === 0) {
      setError("Name is required");
      setShowError(true);
      return;
    } else if (userInput.username.length === 0) {
      setError("Username is required");
      setShowError(true);
      return;
    } else if (userInput.password.length === 0) {
      setError("Password is required");
      setShowError(true);
      return;
    } else {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://192.168.1.153:8080/api/v1/register",
          userInput
        );
        setLoading(false);
        navigate("/sign-in");
      } catch (error) {
        setLoading(false);
        setShowError(true);
        if (error.response.data.error_details) {
          setError(error.response.data.error_details);
        } else {
          setError(error.response.data.message);
        }
        console.log(typeof error.response.data.error_details);
      }
    }
  };

  console.log(error);

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
            message={typeof error === "object" ? error[0].msg : error}
            showErrorHandler={showErrorHandler}
            showError={showError}
          />
          <div className="signUpContainer">
            <div className="logoContainer">
              <img src={signUpLogo} alt="sign up logo" />
            </div>
            <form onSubmit={onSubmitHandler}>
              <div className="form_input">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={userInputHandler}
                  className={
                    typeof error === "object"
                      ? error[0].msg.includes("Name")
                        ? "error"
                        : ""
                      : error.includes("Name")
                      ? "error"
                      : ""
                  }
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={userInputHandler}
                  className={
                    typeof error === "object"
                      ? error[0].msg.includes("Username")
                        ? "error"
                        : ""
                      : error.includes("Username")
                      ? "error"
                      : ""
                  }
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={userInputHandler}
                  className={
                    typeof error === "object"
                      ? error[0].msg.includes("Password")
                        ? "error"
                        : ""
                      : error.includes("Password")
                      ? "error"
                      : ""
                  }
                />
              </div>
              <div className="button">
                <Button
                  title="Create Account"
                  buttonType="primary"
                  width="100%"
                />
              </div>
              <p>
                Already have an account?{" "}
                <Link to="/sign-in">
                  <span>Login</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
