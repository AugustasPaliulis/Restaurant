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

const ConfirmOrder = ({ data, getback, found, newCartId }) => {
  const [saveData, setSaveData] = useState(false);
  const user = useContext(FirebaseAuthUser);
  const router = useRouter();
  console.log(newCartId);
  const submitOrder = () => {
    // Adding order details to order history collection in firestore
    const userRef = doc(
      collection(db, "order_history", user.user.uid, "orders"),
      newCartId ? newCartId : user.cartId
    );

    setDoc(
      userRef,
      {
        cartId: newCartId ? newCartId : user.cartId,
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
            line1: data.line1,
            line2: data.line2,
            postal_code: data.postal_code,
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
                  {data.line1}
                </li>
                <li>
                  <h3>Address second line:</h3>
                  {data.line2}
                </li>
                <li>
                  <h3>Zip code:</h3>
                  {data.postal_code}
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
