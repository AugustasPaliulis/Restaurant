import MenuItem from "../menu_item";
import styles from "./Menu.module.scss";

const MenuBlock = ({ mealName, meals, secondary }) => {
  const containerStyles = `${styles.menuContainer} ${
    secondary ? styles.menuContainerSecondary : ""
  }`;

  const item = () => {
    if (!meals) {
      return <div>Loading...</div>;
    }

    const meal = meals.items.map((meal) => {
      return (
        <MenuItem
          key={meal.name}
          name={meal.name}
          description={meal.description}
          price={meal.price}
          id={meal.stripePriceId}
          addOrder
        />
      );
    });

    return meal;
  };
  return (
    <div className={containerStyles}>
      <div className={styles.imageContainer}></div>
      <div className={styles.dishesContainer}>
        <div className={styles.menuTitle}>
          <h1>{mealName}</h1>
          <p>Savor a delightful morning with our breakfast menu.</p>
        </div>
        {item()}
      </div>
    </div>
  );
};

export default MenuBlock;
