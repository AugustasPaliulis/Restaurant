import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Sidebar.module.scss";
import Trash from "@/icons/trash";
import { motion } from "framer-motion";

import { FirebaseAuthUser } from "@/context/firebase/auth/context";
import Link from "next/link";
import Button from "../button";
import { saveToSessionStorage } from "@/context/session/cart_session";

const CartSidebar = ({ showCart, setShowCart, iconRef }) => {
  const user = useContext(FirebaseAuthUser); // Getting user context
  const divRef = useRef(); // Ref for closing cart side bar

  const totalPrice = () => {
    return user.cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  };
  // Current order items
  const currentOrder = () => {
    const items =
      user.cart.length !== 0 ? (
        user.cart.map((item) => {
          return (
            <div key={item.mealName} className={styles.cartItem}>
              <div className={styles.itemName}>{item.mealName}</div>
              <div className={styles.itemQuantity}>x{item.quantity}</div>
              <div className={styles.itemPrice}>{item.price}$</div>
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

    saveToSessionStorage("cart", updatedItems);
  };

  // Close cart side bar on click outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the clicked element is outside the div
      if (
        divRef.current &&
        !divRef.current.contains(event.target) &&
        !iconRef.current.contains(event.target)
      ) {
        setShowCart(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // random checkout ID generator
  const checkoutID = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomId = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  };

  return (
    <>
      {showCart ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.cartSideMenu}
          ref={divRef}
        >
          <div className={styles.cartTitle}>Current items</div>
          <div className={styles.cartItemsContainer}>{currentOrder()}</div>
          <div className={styles.totalContainer}>
            <div className={styles.total}>Total:</div>
            <div className={styles.totalPrice}>{totalPrice()}$</div>
          </div>
          <div className={styles.checkoutButtonsContainer}>
            <Link href={{ pathname: `/checkout/${checkoutID()}` }}>
              <Button buttonSize="medium" onClick={() => setShowCart(false)}>
                Check out
              </Button>
            </Link>
          </div>
        </motion.div>
      ) : null}
    </>
  );
};

export default CartSidebar;
