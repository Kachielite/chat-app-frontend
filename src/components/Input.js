import "../common/css/component/input.css";

const Button = (props) => {
  const { type, name, placeholder } = props;
  return <input type={type} name={name} placeholder={placeholder} autoComplete="off"/>;
};

export default Button;
