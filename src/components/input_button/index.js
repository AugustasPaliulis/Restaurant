//TODO
//Add more functionality according to needs
import styles from "./Button.module.scss";
const COLOR = ["green", "orange", "brown", "grey"];
const STYLE = ["fill", "outline"];

const InputButton = ({
  buttonColor,
  buttonStyle,
  children,
  icon,
  buttonType,
  onClick,
  disabled,
}) => {
  const checkColor = COLOR.includes(buttonColor) ? buttonColor : COLOR[0];
  const checkStyle = STYLE.includes(buttonStyle)
    ? checkColor.concat("-", buttonStyle)
    : checkColor.concat("-", STYLE[0]);
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={buttonType}
      className={`${styles[checkStyle]} ${disabled ? styles.disabled : null}`}
    >
      <div className={styles.icon}>{icon}</div>
      <div className={styles.buttonText}>{children}</div>
    </button>
  );
};

export default InputButton;
