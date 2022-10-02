import "../common/css/component/input.css";

const Button = (props) => {
  const { type, name, placeholder , userInputHandler} = props;

  return <input type={type} name={name} placeholder={placeholder} autoComplete="off" onChange={userInputHandler} required/>;
};

export default Button;
