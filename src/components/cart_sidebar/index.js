import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Sidebar.module.scss";
import Trash from "@/icons/trash";
import { motion } from "framer-motion";

import { FirebaseAuthUser } from "@/context/firebase/auth/context";
import Link from "next/link";

const CartSidebar = ({ showCart, setShowCart }) => {
  const user = useContext(FirebaseAuthUser); // Getting user context
  const divRef = useRef(); // Ref for closing cart side bar

  const totalPrice = () => {
    return user.cart.reduce((sum, item) => sum + item.price, 0);
  };

  // Current order items
  const currentOrder = () => {
    const items =
      user.cart.length !== 0 ? (
        user.cart.map((item) => {
          return (
            <div className={styles.cartItem}>
              <div className={styles.itemName}>{item.mealName}</div>
              <div className={styles.itemQuantity}>x{item.quantity}</div>
              <div className={styles.itemPrice}>{item.price}</div>
              <div
                onClick={() => deleteItem(item.mealName)}
                className={styles.deleteItem}
              >
                <Trash />
              </div>
            </div>
          );
        })
      ) : (
        <div className={styles.emptyCart}>
          Your cart is empty
          <br />
          <div className={styles.orderLink}>
            Order{" "}
            <Link onClick={() => setShowCart(false)} href="/menu">
              here
            </Link>
          </div>
        </div>
      );

    return items;
  };

  // Delete item from cart
  const deleteItem = (name) => {
    const itemindex = user.cart.findIndex((item) => item.mealName === name);

    const updatedItems = [
      ...user.cart.slice(0, itemindex),
      ...user.cart.slice(itemindex + 1),
    ];
    user.setCart(updatedItems);
  };

  // Close cart side bar on click outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the clicked element is outside the div
      if (divRef.current && !divRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      {showCart ? (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className={styles.cartSideMenu}
          ref={divRef}
        >
          <div className={styles.cartTitle}>Current items</div>
          <div className={styles.cartItemsContainer}>{currentOrder()}</div>
          <div className={styles.totalContainer}>
            <div className={styles.total}>Total:</div>
            <div className={styles.totalPrice}>{totalPrice()}</div>
          </div>
        </motion.div>
      ) : null}
    </>
  );
};

export default CartSidebar;
