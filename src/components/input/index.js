import styles from "./Input.module.scss";
import { Inter } from "next/font/google";

const Input = ({ placeholder, value, type, onChange, label, inputColor }) => {
  return (
    <div className={styles["input-container"]}>
      <div className={styles.label}>{label}</div>
      <input
        className={`${styles.input} ${styles[inputColor]}`}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
