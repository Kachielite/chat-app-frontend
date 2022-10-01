import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import signUpLogo from "../common/images/signUpLogo.svg";
import "../common/css/pages/signup.css";

const SignUp = () => {
  return (
    <div className="container">
      <div className="signUpContainer">
        <div className="logoContainer">
          <img src={signUpLogo} alt="sign up logo" />
        </div>
        <form>
          <div className="form_input">
            <Input type="text" name="name" placeholder="Name" />
            <Input type="text" name="username" placeholder="Username" />
            <Input type="password" name="password" placeholder="Password" />
          </div>
          <Button title="Create Account" type="primary" width="100%" />
          <p>
            Already have an account?{" "}
            <Link to="/sign-in">
              <span>Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
