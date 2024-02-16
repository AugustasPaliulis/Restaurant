"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FirebaseAuthUser } from "@/context/firebase/auth/context";
import Link from "next/link";

import styles from "./OrderList.module.scss";

import Button from "@/components/button";
import OrderListItem from "@/components/order_list_item";
import { redirectToCheckout } from "@/stripe/redirect";
import Checkbox from "@/components/checkbox";

const CompleteOrderList = () => {
  const user = useContext(FirebaseAuthUser); // user context
  const router = useRouter();
  const [pickup, setPickup] = useState(false);

  useEffect(() => {
    if (!user.loadingCart && (!user.cart || user.cart.length === 0)) {
      router.push("/menu");
    }
  }, [user]);
  if (user && user.cart && user.cart.length > 0) {
    const cartItems = user.cart.map((item, index) => (
      <OrderListItem
        key={index}
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
    // Changing pick up state
    const changePickup = (e) => {
      setPickup(e.target.checked);
    };
    return (
      <div className={styles.listContainer}>
        <ul>{cartItems}</ul>
        <div className={styles.paymentButtonContainer}>
          <Button
            buttonColor="orange"
            onClick={() => {
              redirectToCheckout(user.cart, user.user);
            }}
          >
            Pay right now
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className={`${styles.listContainer} ${styles.empty}`}>
      No items in cart
      <div className={styles.orderLink}>
        Please order <Link href="/menu">here</Link>
      </div>
    </div>
  );
};

export default CompleteOrderList;
