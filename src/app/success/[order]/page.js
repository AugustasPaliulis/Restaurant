"use client";
import { useContext, useEffect } from "react";
import Link from "next/link";
import styles from "./Success.module.scss";
import { FirebaseAuthUser } from "@/context/firebase/auth/context";

const Success = ({ params }) => {
  // Clear cart after successful order
  const user = useContext(FirebaseAuthUser);

  useEffect(() => {
    user.setCart([]);
    localStorage.removeItem("cart");
  }, []);
  return (
    <div className={styles.successContainer}>
      <div className={styles.checkmark} />
      <div>
        <h1>
          Your order has been <strong>successful</strong>
        </h1>
        <h1>
          You can find you orders in <Link href="/account">Account</Link> page
        </h1>
      </div>
    </div>
  );
};

export default Success;
