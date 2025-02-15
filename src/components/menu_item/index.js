"use client";
import { useState, useContext, useEffect } from "react";

import styles from "./MenuItem.module.scss";
import { motion } from "framer-motion";

import Plus from "@/icons/plus";
import Minus from "@/icons/minus";

import { FirebaseAuthUser } from "@/context/firebase/auth/context";
import { saveToSessionStorage } from "@/context/session/cart_session";

const MenuItem = ({ name, description, price, addOrder, id }) => {
  const [itemPressed, setItemPressed] = useState(false);

  const [itemQuantity, setItemQuantity] = useState(0);

  const [quantityChanged, setQuantityChanged] = useState(false);

  const user = useContext(FirebaseAuthUser); // Getting user context
  useEffect(() => {
    const foundItem = user.cart.find((item) => item.mealName === name);
    if (foundItem) {
      setItemQuantity(foundItem.quantity);
    }
  }, [user.cart]);
  // Increase/decrease quantity functions
  const increaseQuantity = (event) => {
    event.stopPropagation();
    setItemQuantity(itemQuantity + 1);
    setQuantityChanged(true);
  };
  const decreaseQuantity = (event) => {
    event.stopPropagation();
    if (itemQuantity !== 0) {
      setItemQuantity(itemQuantity - 1);
      setQuantityChanged(true);
    }
  };
  // Adding item to global state
  useEffect(() => {
    const alreadyInCart = user.cart.findIndex((item) => item.mealName === name);
    if (quantityChanged) {
      if (itemQuantity > 0 && alreadyInCart === -1) {
        const itemState = [
          ...user.cart,
          {
            mealName: name,
            quantity: itemQuantity,
            price: price * itemQuantity,
            priceId: id,
          },
        ];
        // If item doesn't exits in state, add it
        user.setCart(itemState);
        saveToSessionStorage("cart", itemState, user.cartId);
      } else if (itemQuantity === 0 && alreadyInCart !== -1) {
        // Removing item
        const updatedItems = [
          ...user.cart.slice(0, alreadyInCart),
          ...user.cart.slice(alreadyInCart + 1),
        ];
        user.setCart(updatedItems);
        saveToSessionStorage("cart", updatedItems, user.cartId);

        return;
      } else if (itemQuantity > -1 && alreadyInCart !== -1) {
        // When item already is in state, just change quantity of it
        const newState = [...user.cart];
        newState[alreadyInCart].quantity = itemQuantity;
        newState[alreadyInCart].price = price * itemQuantity;
        user.setCart(newState);
        saveToSessionStorage("cart", newState, user.cartId);
      }
      setQuantityChanged(false);
    }
  }, [itemQuantity]);

  // On removal of item from global state, change quantity to 0
  useEffect(() => {
    const inCart = user.cart.findIndex((item) => item.mealName === name);
    if (inCart === -1) {
      setItemQuantity(0);
    }
  }, [user.cart]);
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
