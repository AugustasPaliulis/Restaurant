import styles from "./Input.module.scss";
import { Inter } from "next/font/google";

const Input = ({
  placeholder,
  value,
  type,
  onChange,
  label,
  inputColor,
  icon,
  error,
  tooltip,
}) => {
  return (
    <div className={styles["input-container"]}>
      <div className={`${styles.label} ${error ? styles.error : null}`}>
        {icon}
        {error ? error : label}
        {tooltip}
      </div>
      <input
        className={`${styles.input} ${styles[inputColor]} ${
          error ? styles.error : ""
        }`}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
