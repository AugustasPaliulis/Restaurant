import Image from "next/image";
import MenuItem from "../menu_item";
import styles from "./Menu.module.scss";

import breakfast from "@/pictures/toast_breakfast.webp";
import lunch from "@/pictures/salad_lunch.webp";
import dinner from "@/pictures/pasta_dinner.webp";
import dessert from "@/pictures/cake_dessert.webp";
import drink from "@/pictures/mojito_drink.webp";
import snack from "@/pictures/nachos_snack.webp";

const mealImages = {
  breakfast,
  lunch,
  dinner,
  dessert,
  drink,
  snack,
};

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
      <div className={styles.imageContainer}>
        <Image
          className={styles[mealName]}
          src={mealImages[mealName]}
          alt={`${mealName} toast`}
          width={1547}
          height={2000}
        />
      </div>
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
