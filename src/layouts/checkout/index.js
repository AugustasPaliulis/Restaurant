import styles from "./Checkout.module.scss";
const CheckoutLayout = ({ children }) => {
  return <div className={styles.checkoutLayoutContainer}>{children}</div>;
};

export default CheckoutLayout;
