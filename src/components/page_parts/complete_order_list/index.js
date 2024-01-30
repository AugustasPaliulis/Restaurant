"use client";
import { useContext } from "react";
import { FirebaseAuthUser } from "@/context/firebase/auth/context";

import styles from "./OrderList.module.scss";

const CompleteOrderList = () => {
  const user = useContext(FirebaseAuthUser); // user context
  if (user && user.cart) {
    const cartItems = user.cart.map((item, index) => (
      <li key={index}>
        <div className={styles.titleQuantityGroup}>
          <div>{item.mealName}</div>
          <div className={styles.quantity}>x{item.quantity}</div>
        </div>
        <div className={styles.price}>{item.price}</div>
      </li>
    ));
    return <ul className={styles.listContainer}>{cartItems}</ul>;
  }
  return <div>No items in cart</div>;
};

export default CompleteOrderList;
