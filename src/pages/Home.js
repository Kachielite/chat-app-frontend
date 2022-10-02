import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../common/images/logo.svg";
import useWindowDimensions from "../utils/useWindowsDimensions";
import "../common/css/pages/home.css";

const Home = () => {
  const { width } = useWindowDimensions();
  return (
    <div className="container">
      <div className="homeContainer">
        <div className="logoContainer">
          <img src={Logo} alt="Logo" />
        </div>
        <p>Keeping Communication alive</p>
        <div className="buttonContainer">
          <Link to="/sign-in">
            <Button title="Login" buttonType="primary" width={width < 480 ? "332px":"550px"} />
          </Link>
          <Link to="/sign-up">
            <Button title="Sign Up" buttonType="secondary" width={width < 480 ? "332px":"550px"}  />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
