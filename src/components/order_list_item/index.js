"use client";
import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FirebaseAuthUser } from "@/context/firebase/auth/context";
import styles from "./OrderItem.module.scss";

import Plus from "@/icons/plus";
import Minus from "@/icons/minus";
import Trash from "@/icons/trash";
import { saveToSessionStorage } from "@/context/session/cart_session";

const OrderListItem = ({ index, mealName, quantity, price }) => {
  const user = useContext(FirebaseAuthUser); // Getting user context
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const [itemPressed, setItemPressed] = useState(false);

  // Changin quantity of item in global state
  useEffect(() => {
    const itemIndex = user.cart.findIndex((item) => item.mealName === mealName);
    if (itemIndex !== -1) {
      const updatedItems = [...user.cart];
      if (itemQuantity === 0) {
        // Remove item from array
        updatedItems.splice(itemIndex, 1);
      } else {
        updatedItems[itemIndex].quantity = itemQuantity;
        updatedItems[itemIndex].price = +(
          itemQuantity *
          (price / quantity)
        ).toFixed(2);
      }
      user.setCart(updatedItems);
      saveToSessionStorage("cart", updatedItems);
    }
  }, [itemQuantity]);

  // Increase/decrease quantity functions
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

  const itemPressedHandler = () => {
    setItemPressed(!itemPressed);
  };

  // Deleting item from cart
  const deleteItem = () => {
    const itemindex = user.cart.findIndex((item) => item.mealName === mealName);

    const updatedItems = [
      ...user.cart.slice(0, itemindex),
      ...user.cart.slice(itemindex + 1),
    ];
    user.setCart(updatedItems);

    saveToSessionStorage("cart", updatedItems);
  };

  return (
    <>
      {itemPressed ? (
        <li
          onClick={itemPressedHandler}
          className={`${styles.item} ${styles.pressedItem}`}
        >
          <div className={styles.itemName}>{mealName}</div>

          <motion.div
            key={index}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className={styles.quantityChangingGroup}
          >
            <div className={styles.quantity}>x{itemQuantity}</div>
            <Minus
              onClick={(e) => decreaseQuantity(e)}
              width={15}
              height={15}
            />
            <Plus onClick={increaseQuantity} width={15} height={15} />
            <Trash onClick={deleteItem} />
          </motion.div>
          <div className={styles.price}>{price}</div>
        </li>
      ) : (
        <li onClick={itemPressedHandler} className={styles.item} key={index}>
          <div className={styles.titleQuantityGroup}>
            <div>{mealName}</div>
            <div className={styles.quantity}>x{itemQuantity}</div>
          </div>
          <div className={styles.price}>{price}</div>
        </li>
      )}
    </>
  );
};

export default OrderListItem;
