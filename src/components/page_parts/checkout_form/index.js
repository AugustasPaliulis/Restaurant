"use client";

import Input from "@/components/input";
import styles from "./Form.module.scss";
import { useState } from "react";
import InputButton from "@/components/input_button";

const CheckoutForm = () => {
  // Form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressFirst, setAddressFirst] = useState("");
  const [addressSecond, setAddressSecond] = useState("");
  const [zip, setZip] = useState("");
  const [errors, setErrors] = useState({});

  const submit = (event) => {
    event.preventDefault();

    const newErrors = {};

    // Check each field and set errors if empty
    if (!firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required";
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!addressFirst) {
      newErrors.addressFirst = "Address is required";
    }

    if (!addressSecond) {
      newErrors.addressSecond = "Address (second line) is required";
    }

    if (!zip) {
      newErrors.zip = "ZIP code is required";
    }

    // Update the errors state
    setErrors(newErrors);

    // If there are no errors, proceed with form submission logic
    if (Object.keys(newErrors).length === 0) {
      // Your form submission logic here
    }
  };
  return (
    <div className={styles.formContainer}>
      <div className={styles.formTitleContainer}>
        <h1>Delivery information</h1>
      </div>
      <div className={styles.inputsContainer}>
        <form onSubmit={submit}>
          <Input
            onChange={(e) => {
              setErrors({ ...errors, firstName: null });
              setFirstName(e.target.value);
            }}
            error={errors.firstName}
            label="First name"
          />
          <Input
            onChange={(e) => {
              setErrors({ ...errors, lastName: null });
              setLastName(e.target.value);
            }}
            error={errors.lastName}
            label="Last name"
          />
          <Input
            onChange={(e) => {
              setErrors({ ...errors, phoneNumber: null });
              setPhoneNumber(e.target.value);
            }}
            error={errors.phoneNumber}
            label="Phone number"
          />
          <Input
            onChange={(e) => {
              setErrors({ ...errors, addressFirst: null });
              setAddressFirst(e.target.value);
            }}
            error={errors.addressFirst}
            label="Address"
          />
          <Input
            onChange={(e) => {
              setErrors({ ...errors, addressSecond: null });
              setAddressSecond(e.target.value);
            }}
            error={errors.addressSecond}
            label="Address line 2"
          />
          <Input
            onChange={(e) => {
              setErrors({ ...errors, zip: null });
              setZip(e.target.value);
            }}
            error={errors.zip}
            label="Zip code"
            select
            placeholder="&#9660;"
          />
          <InputButton>Submit</InputButton>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
