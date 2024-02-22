"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./Input.module.scss";

import data from "../../utils/countryCodes.json"; // Importing country codes

const Input = ({
  placeholder,
  value,
  type,
  onChange,
  label,
  inputColor,
  disable,
  icon, // Icon for the input
  error, // Error message
  tooltip, // Tooltip message
  select, // Array with two elements, first is the value of the select, second is the function to change the value (for dropdown)
  selectContent, // Array of content for the select dropdown
  countryCodes, // If true, then we use country codes
}) => {
  // State for showing select dropdown
  const [show, setShow] = useState(false);
  // Handle click on select dropdown
  const handleClick = () => {
    setShow(!show);
  };

  const containerRef = useRef(); // Ref for select dropdown

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  // Show content of select dropdown
  // Map through the array of selectContent and return ul with li for each element
  // If input is made for country codes then we map through the object of country codes
  const showContent = () => {
    if (countryCodes) {
      return Object.keys(data).map((item, index) => {
        return (
          <ul
            key={index}
            className={styles.selectItem}
            onClick={() => setShow(false)}
          >
            <li onClick={() => select[1](data[item])}>
              {item}: {data[item]}
            </li>
          </ul>
        );
      });
    }
    if (!Array.isArray(selectContent)) {
      return null;
    }
    return selectContent.map((item) => {
      return (
        <ul
          key={item}
          className={styles.selectItem}
          onClick={() => setShow(false)}
        >
          <li onClick={() => select[1](item)}>{item}</li>
        </ul>
      );
    });
  };

  return !select ? (
    <div className={styles["input-container"]}>
      <div className={`${styles.label} ${error ? styles.error : null}`}>
        {icon}
        {error ? error : label}
        {tooltip}
      </div>
      {type === "textarea" ? (
        <textarea
          className={`${styles.input} ${styles[inputColor]} ${
            styles.textarea
          } ${error ? styles.error : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          disabled={disable}
          className={`${styles.input} ${styles[inputColor]} ${
            error ? styles.error : ""
          }`}
          placeholder={placeholder}
          value={value}
          type={type}
          onChange={onChange}
        />
      )}
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
        } ${error ? styles.error : ""} ${show ? styles.select : ""}`}
        onClick={handleClick}
      >
        <div className={styles.selectText}>{select[0]}</div>
        <div className={styles.selectArrow}>{placeholder}</div>
      </div>
      {show && (
        <div ref={containerRef} className={styles.selectContent}>
          {showContent()}
        </div>
      )}
    </div>
  );
};

export default Input;
