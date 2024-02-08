//TODO:
//Pasiziureti kaip veikia mygtukas su ikonomis + tekstu
import styles from "./Button.module.scss";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// Use element <Button> and provide buttonColor; buttonSize; buttonStyle according to below values or
// leave blank for default values

const COLOR = ["green", "orange", "brown"];
const SIZE = ["small", "medium", "large"];
const STYLE = ["fill", "outline"];

const Button = ({
  buttonColor,
  buttonSize,
  buttonStyle,
  children,
  onClick,
  disabled,
}) => {
  const checkSize = SIZE.includes(buttonSize) ? buttonSize : SIZE[0];
  const checkStyle = STYLE.includes(buttonStyle) ? buttonStyle : STYLE[0];
  const checkColor = COLOR.includes(buttonColor) ? buttonColor : COLOR[0];
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${styles[checkStyle]} ${styles[checkColor]} ${
        styles[checkSize]
      } ${disabled && styles.disabled} ${inter.className}`}
    >
      {children}
    </button>
  );
};

export default Button;
