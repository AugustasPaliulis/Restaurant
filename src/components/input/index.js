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
  select,
  selectContent,
}) => {
  const showContent = () => {
    return (
      <ul>
        <li>HI</li>
        <li>HI</li>
        <li>HI</li>
        <li>HI</li>
      </ul>
    );
  };
  return !select ? (
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
  ) : (
    <div className={styles["input-container"]}>
      <div className={`${styles.label} ${error ? styles.error : null}`}>
        {icon}
        {error ? error : label}
        {tooltip}
      </div>
      <div
        className={`${styles.selectInput} ${styles.input} ${
          styles[inputColor]
        } ${error ? styles.error : ""}`}
      >
        <div className={styles.selectArrow}>{placeholder}</div>
      </div>
      <div className={styles.selectContent}>{showContent()}</div>
    </div>
  );
};

export default Input;
