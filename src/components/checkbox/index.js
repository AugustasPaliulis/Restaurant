import styles from "./Checkbox.module.scss";
import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: "500" });
const Checkbox = ({ checked, onChange, label }) => {
  return (
    <div className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        name="pickup"
        value="pickup"
        checked={checked}
        onChange={(e) => {
          onChange(e);
        }}
      />
      <label className={roboto.className}>{label}</label>
    </div>
  );
};

export default Checkbox;
