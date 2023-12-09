import MenuItem from "@/components/menu_item";
import styles from "./Menu.module.scss";
import MenuBlock from "@/components/menu_block";

const Menu = ({ meals }) => {
  return (
    <div className={styles.menuContainer}>
      <MenuBlock mealName="breakfast" meals={meals["breakfast"]} />
      <MenuBlock mealName="lunch" meals={meals["lunch"]} secondary />
      <MenuBlock mealName="dinner" meals={meals["dinner"]} />
      <MenuBlock mealName="dessert" meals={meals["dessert"]} secondary />
      <MenuBlock mealName="drink" meals={meals["drink"]} />
      <MenuBlock mealName="snack" meals={meals["snack"]} secondary />
    </div>
  );
};

export default Menu;
