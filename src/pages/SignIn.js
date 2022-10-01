import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import signInLogo from "../common/images/signInLogo.svg";
import "../common/css/pages/signin.css";

const SignIn = () => {
  return (
    <div className="container">
      <div className="signInContainer">
        <div className="logoContainer">
          <img src={signInLogo} alt="sign in logo" />
        </div>
        <form>
          <div className="form_input">
            <Input type="text" name="username" placeholder="Username" />
            <Input type="password" name="password" placeholder="Password" />
          </div>
          <Button title="Login" type="primary" width="650px" />
          <p style={{marginTop: '30px'}}>
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
