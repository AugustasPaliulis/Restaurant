//TODO
//Add more functionality according to needs
import styles from "./Button.module.scss";
const COLOR = ["green", "orange", "brown"];

const InputButton = ({ buttonColor, children }) => {
  const checkColor = COLOR.includes(buttonColor) ? buttonColor : COLOR[0];
  return <button className={`${styles[checkColor]}`}>{children}</button>;
};

export default InputButton;
