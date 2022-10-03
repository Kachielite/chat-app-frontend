import "../common/css/component/input.css";

const Button = (props) => {
  const { type, name, placeholder, userInputHandler, errorClassName } = props;

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      autoComplete="off"
      onChange={userInputHandler}
      required
      style={{border: '4px solid rgb(237, 32, 32)'}}
    />
  );
};

export default Button;
