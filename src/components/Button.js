import '../common/css/component/button.css'

const Button = (props) => {
  const { title, buttonType, width } = props;
  const primary = {width: width, backgroundColor: '#1162E0', border: '1px solid #001D4A', color:'#FFFFFF'}
  const secondary = { width: width, backgroundColor: '##FFFFFF', border: '1px solid #001D4A', color:'#001D4A'}
  return (
    <button style={buttonType==='primary' ? primary : secondary} className="button" >{title}</button>
  );
};

export default Button;
