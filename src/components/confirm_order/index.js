"use client";
import ArrowLeft from "@/icons/arrowLeft";
import styles from "./Confim.module.scss";
import Button from "../button";
import { useState } from "react";
import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: "500" });
const ConfirmOrder = ({ data, getback }) => {
  const [saveData, setSaveData] = useState(false);

  return (
    <>
      <div className={styles.confirmationContainer}>
        <div onClick={() => getback(false)} className={styles.goBackContainer}>
          <ArrowLeft /> Go back
        </div>
        <div className={styles.confirmationTitleContainer}>
          <h1>Confirm your order</h1>
        </div>
        <div className={styles.orderDataContainer}>
          <ul>
            <li>
              <h3>First name:</h3>
              {data.firstName}
            </li>
            <li>
              <h3>Last name:</h3>
              {data.lastName}
            </li>
            <li>
              <h3>Phone number country code:</h3>
              {data.countryCode}
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
            console.log(data);
          }}
          buttonSize="large"
        >
          Data is correct
        </Button>
        <div className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            name="save data"
            value="save data"
            checked={saveData}
            onClick={(e) => {
              setSaveData(e.target.checked);
            }}
          />
          <label className={roboto.className}>Save information for later</label>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
