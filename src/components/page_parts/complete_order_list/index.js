"use client";
import { useContext } from "react";
import { FirebaseAuthUser } from "@/context/firebase/auth/context";

import styles from "./OrderList.module.scss";
import Link from "next/link";
import OrderListItem from "@/components/order_list_item";

const CompleteOrderList = () => {
  const user = useContext(FirebaseAuthUser); // user context
  if (user && user.cart && user.cart.length > 0) {
    const cartItems = user.cart.map((item, index) => (
      <OrderListItem
        index={index}
        mealName={item.mealName}
        quantity={item.quantity}
        price={item.price}
      />
      // <li key={index}>
      //   <div className={styles.titleQuantityGroup}>
      //     <div>{item.mealName}</div>
      //     <div className={styles.quantity}>x{item.quantity}</div>
      //   </div>
      //   <div className={styles.price}>{item.price}</div>
      // </li>
    ));
    return <ul className={styles.listContainer}>{cartItems}</ul>;
  }
  return (
    <div className={styles.listContainer}>
      No items in cart
      <div className={styles.orderLink}>
        Please order <Link href="/menu">here</Link>
      </div>
    </div>
  );
};

export default CompleteOrderList;
