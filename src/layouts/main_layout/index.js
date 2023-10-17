import styles from "./Layout.module.scss";

const MainLayout = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default MainLayout;
