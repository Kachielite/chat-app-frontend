import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../common/images/logo.svg";
import "../common/css/home.css";

const Home = () => {
  return (
    <div className="container">
      <div className="homeContainer">
        <div className="logoContainer">
          <img src={Logo} alt="Logo" />
        </div>
        <p>Keeping Communication alive</p>
        <div className="buttonContainer">
          <Link to="/sign-in">
            <Button title="Login" type="primary" width="610px" />
          </Link>
          <Link to="/sign-up">
            <Button title="Sign Up" type="secondary" width="610px" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
