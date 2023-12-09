"use client";
import { useState, useContext, useEffect } from "react";

import styles from "./MenuItem.module.scss";
import { motion } from "framer-motion";

import Plus from "@/icons/plus";
import Minus from "@/icons/minus";

import { FirebaseAuthUser } from "@/context/firebase/auth/context";

const MenuItem = ({ name, description, price, addOrder }) => {
  const [itemPressed, setItemPressed] = useState(false);

  const [itemQuantity, setItemQuantity] = useState(0);

  const user = useContext(FirebaseAuthUser); // Getting user context

  const increaseQuantity = (event) => {
    event.stopPropagation();
    setItemQuantity(itemQuantity + 1);
  };
  const decreaseQuantity = (event) => {
    event.stopPropagation();
    if (itemQuantity !== 0) {
      setItemQuantity(itemQuantity - 1);
    }
  };

  useEffect(() => {
    const alreadyInBasket = user.basket.findIndex(
      (item) => item.mealName === name
    );
    if (itemQuantity > 0 && alreadyInBasket === -1) {
      user.setBasket([
        ...user.basket,
        { mealName: name, quantity: itemQuantity },
      ]);
    } else if (itemQuantity > 0 && alreadyInBasket !== -1) {
      const newState = [...user.basket];
      newState[alreadyInBasket].quantity = itemQuantity;
      user.setBasket(newState);
    }
  }, [itemQuantity]);
  return (
    <>
      <div
        onClick={() => setItemPressed(!itemPressed)}
        className={`${styles.menuItem} ${
          addOrder && itemPressed ? styles.orderingStyle : ""
        }`}
      >
        <div className={styles.itemDescriptionContainer}>
          <h1 className={styles.itemTitle}>{name}</h1>
          <p className={styles.itemDescription}>{description}</p>
          <small>560 CAL</small>
        </div>
        <div className={styles.itemPriceContainer}>
          {addOrder && itemPressed ? (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              // className={styles.menuItem}
            >
              <div className={styles.itemQuantityContainer}>
                <Minus onClick={decreaseQuantity} />
                <div className={styles.quantity}>{itemQuantity}</div>
                <Plus onClick={increaseQuantity} />
              </div>
              <h1>{(price * itemQuantity).toFixed(2)}$</h1>
            </motion.div>
          ) : (
            <h1>{price}$</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default MenuItem;
