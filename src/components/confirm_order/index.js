"use client";
import ArrowLeft from "@/icons/arrowLeft";
import styles from "./Confim.module.scss";
import Button from "../button";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Roboto } from "next/font/google";

import { db } from "@/firebase/config";
import { setDoc, doc, collection } from "firebase/firestore";
import { FirebaseAuthUser } from "@/context/firebase/auth/context";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

const ConfirmOrder = ({ data, getback, found }) => {
  const [saveData, setSaveData] = useState(false);
  const user = useContext(FirebaseAuthUser);
  const router = useRouter();
  const submitOrder = () => {
    // Adding order details to order history collection in firestore

    const userRef = doc(
      collection(db, "order_history", user.user.uid, "orders"),
      user.cartId
    );

    setDoc(
      userRef,
      {
        cartId: user.cartId,
        items: user.cart,
        customerInfo: data,
        date: new Date(),
      },
      { merge: true }
    );

    // If user wants to save data for later, add it to user info collection

    if (saveData) {
      const userRef = doc(db, "user_info", user.user.uid);

      if (!data.restaurant) {
        setDoc(
          userRef,
          {
            name: data.name,
            phoneNumber: data.phoneNumber,
            line1: data.addressFirst,
            line2: data.addressSecond,
            postal_code: data.zip,
            city: data.city,
          },
          { merge: false }
        );
      } else {
        setDoc(
          userRef,
          {
            name: data.name,
            phoneNumber: data.phoneNumber,
            restaurant: data.restaurant,
            city: data.city,
          },
          { merge: false }
        );
      }
    }
    user.setAlert({
      message: "Your order has been successful",
      type: "success",
    });
    user.setCart([]);
    localStorage.removeItem("cart");
  };
  return (
    <>
      <div className={styles.confirmationContainer}>
        <div onClick={() => getback(false)} className={styles.goBackContainer}>
          <ArrowLeft /> Go back
        </div>
        <div className={styles.confirmationTitleContainer}>
          <h1>Confirm your order</h1>
          {data.restaurant && <p>For pickup</p>}
        </div>
        <div className={styles.orderDataContainer}>
          <ul>
            <li>
              <h3>Name:</h3>
              {data.name}
            </li>
            <li>
              <h3>Phone number:</h3>
              {data.phoneNumber}
            </li>
            {!data.restaurant ? (
              <>
                <li>
                  <h3>Address first line:</h3>
                  {data.addressFirst}
                </li>
                <li>
                  <h3>Address second line:</h3>
                  {data.addressSecond}
                </li>
                <li>
                  <h3>Zip code:</h3>
                  {data.zip}
                </li>
              </>
            ) : (
              <>
                <li>
                  <h3>Restaurant for pickup:</h3>
                  {data.restaurant}
                </li>
              </>
            )}
            <li>
              <h3>City:</h3>
              {data.city}
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => {
            submitOrder();
          }}
          buttonSize="large"
        >
          Data is correct
        </Button>
        {!found && (
          <div className={styles.checkboxWrapper}>
            <input
              type="checkbox"
              name="save data"
              value="save data"
              checked={saveData}
              onChange={(e) => {
                setSaveData(e.target.checked);
              }}
            />
            <label className={roboto.className}>
              Save information for later
            </label>
          </div>
        )}
      </div>
    </>
  );
};

export default ConfirmOrder;
