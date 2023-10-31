"use client";
import { useEffect, useState } from "react";
import styles from "./Menu.module.scss";

import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const HomeMenuTable = () => {
  const [chosenMeal, setChosenMeal] = useState("breakfast");
  const [meals, setMeals] = useState();

  useEffect(() => {
    async function data() {
      const dishes = [
        "breakfast",
        "lunch",
        "dinner",
        "snack",
        "dessert",
        "drink",
      ];
      dishes.map(async (dish) => {
        const docRef = doc(db, "dishes", dish);

        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMeals((prev) => ({
            ...prev,
            [dish]: docSnap.data(),
          }));
        }
      });
    }
    data();
  }, []);

  const items = () => {
    if (!meals) {
      return null;
    }
    const meal = meals[chosenMeal].items.map((meal) => {
      return (
        <div className={styles.menuItem} key={meal.name}>
          <div className={styles.itemDescriptionContainer}>
            <h1 className={styles.itemTitle}>{meal.name}</h1>
            <p className={styles.itemDescription}>{meal.description}</p>
            <small>560 CAL</small>
          </div>
          <div className={styles.itemPriceContainer}>
            <h1>{meal.price}$</h1>
          </div>
        </div>
      );
    });
    return meal;
  };

  return (
    <>
      <div className={styles.menuContainer}>
        <div className={styles.titleContainer}>
          <h1>Our Food menu</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sed
            pharetra dictum neque massa congue
          </p>
        </div>
        <div className={styles.tableNavContainer}>
          <ul>
            <li
              onClick={() => setChosenMeal("breakfast")}
              className={chosenMeal === "breakfast" ? styles.active : null}
            >
              Breakfast
            </li>
            <li
              onClick={() => setChosenMeal("lunch")}
              className={chosenMeal === "lunch" ? styles.active : null}
            >
              Lunch
            </li>
            <li
              onClick={() => setChosenMeal("dinner")}
              className={chosenMeal === "dinner" ? styles.active : null}
            >
              Dinner
            </li>
            <li
              onClick={() => setChosenMeal("dessert")}
              className={chosenMeal === "dessert" ? styles.active : null}
            >
              Dessert
            </li>
            <li
              onClick={() => setChosenMeal("drink")}
              className={chosenMeal === "drink" ? styles.active : null}
            >
              Drink
            </li>
            <li
              onClick={() => setChosenMeal("snack")}
              className={chosenMeal === "snack" ? styles.active : null}
            >
              Snack
            </li>
          </ul>
        </div>
        <div className={styles.menuTable}>{items()}</div>
      </div>
    </>
  );
};

export default HomeMenuTable;
