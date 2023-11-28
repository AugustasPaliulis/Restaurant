import styles from "./Tooltip.module.scss";

import Info from "@/icons/info";

const ToolTip = ({ text }) => {
  // Info Tool tip component, where props is the displayed text
  return (
    <div className={styles.tooltipContainer}>
      <Info />
      <div className={styles.tooltipContent}>{text}</div>
    </div>
  );
};

export default ToolTip;
