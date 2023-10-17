import styles from "./Layout.module.scss";

const HomepageLayout = ({ children }) => {
  return <div className={styles.homepageLayout}>{children}</div>;
};

export default HomepageLayout;
