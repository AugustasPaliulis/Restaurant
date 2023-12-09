import styles from "./MenuItem.module.scss";

const MenuItem = ({ name, description, price }) => {
  return (
    <>
      <div className={styles.menuItem}>
        <div className={styles.itemDescriptionContainer}>
          <h1 className={styles.itemTitle}>{name}</h1>
          <p className={styles.itemDescription}>{description}</p>
          <small>560 CAL</small>
        </div>
        <div className={styles.itemPriceContainer}>
          <h1>{price}$</h1>
        </div>
      </div>
    </>
  );
};

export default MenuItem;
