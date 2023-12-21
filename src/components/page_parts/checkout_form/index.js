"use client";

import Input from "@/components/input";
import styles from "./Form.module.scss";
import { useEffect, useState } from "react";
import InputButton from "@/components/input_button";
import restaurants from "@/utils/restaurants.json";

const CheckoutForm = () => {
  // Form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressFirst, setAddressFirst] = useState("");
  const [addressSecond, setAddressSecond] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [errors, setErrors] = useState({});

  // Pickup restaurant sate and state for showing pickup form
  const [pickup, setPickup] = useState(false);
  const [restaurant, setRestaurant] = useState("");

  // Use effects for resetting error state when select input is changed:
  // Use effect for resetting country code error state when code is selected
  useEffect(() => {
    setErrors({ ...errors, countryCode: null });
  }, [countryCode]);
  // Use effect for resetting restaurant error state when restaurant is changed
  useEffect(() => {
    setErrors({ ...errors, restaurant: null });
  }, [restaurant]);
  // Use effect for resetting restaurant state and error states (restaurant, city) when city is changed
  useEffect(() => {
    if (pickup) {
      setRestaurant("");
      setErrors({ ...errors, restaurant: null, city: null });
    } else {
      setErrors({ ...errors, city: null });
    }
  }, [city]);

  // Code for pickup (if user wants to pick up the order) information form
  // Pickup form submit code
  const pickUpSubmit = (event) => {
    event.preventDefault();
    // Check if all fields are filled
    const newErrors = {};
    if (!firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{6,10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }
    if (!countryCode) {
      newErrors.countryCode = "Country code is required";
    }
    if (!city) {
      newErrors.city = "City is required";
    }
    if (!restaurant) {
      newErrors.restaurant = "Restaurant is required";
    }
    // Update the errors state
    setErrors(newErrors);

    // If there are no errors, proceed with form submission logic
    if (Object.keys(newErrors).length === 0) {
      console.log({
        firstname: firstName,
        lastname: lastName,
        phoneNumber: phoneNumber,
        city: city,
        restaurant: restaurant,
        countryCode: countryCode,
      });
    }
  };
  // Pickup form
  const pickUpForm = () => {
    return (
      <form onSubmit={pickUpSubmit}>
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
            setErrors({ ...errors, countryCode: null });
          }}
          error={errors.countryCode}
          label="Country code"
          // Select prop which consists of city state and setState function
          select={[countryCode, setCountryCode]}
          placeholder="&#9660;"
          countryCodes
        />
        <Input
          onChange={(e) => {
            setErrors({ ...errors, phoneNumber: null });
            setPhoneNumber(e.target.value);
          }}
          error={errors.phoneNumber}
          label="Phone number"
          placeholder="Phone number without country code"
        />
        <Input
          onChange={(e) => {
            setErrors({ ...errors, city: null });
            setRestaurant("");
          }}
          error={errors.city}
          label="City"
          // Select prop which consists of city state and setState function
          select={[city, setCity]}
          placeholder="&#9660;"
          selectContent={["Amsterdam", "Rotterdam", "Den Haag"]}
        />
        <Input
          error={errors.restaurant}
          label="Restaurant"
          select={[restaurant, setRestaurant]}
          placeholder="&#9660;"
          selectContent={
            city
              ? restaurants[city.toLowerCase()].map((restaurant) => [
                  restaurant.name,
                ])
              : ["Select city first"]
          }
        />
        <InputButton>Submit</InputButton>
      </form>
    );
  };
  // Form submit code
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
    } else if (!/^\d{6,10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
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

    if (!city) {
      newErrors.city = "City is required";
    }
    if (!countryCode) {
      newErrors.countryCode = "Country code is required";
    }

    // Update the errors state
    setErrors(newErrors);

    // If there are no errors, proceed with form submission logic
    if (Object.keys(newErrors).length === 0) {
      console.log({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        addressFirst: addressFirst,
        addressSecond: addressSecond,
        zip: zip,
        city: city,
        countryCode: countryCode,
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formTitleContainer}>
        <h1>Delivery information</h1>
      </div>
      <div className={styles.inputsContainer}>
        <div className={styles.pickupCheckBox}>
          <p>I will pick up my order in one of the restaurants</p>
          <input
            type="checkbox"
            name="pickup"
            value="pickup"
            onChange={(e) => {
              setPickup(e.target.checked);
              setErrors({});
            }}
          />
        </div>
        {pickup ? (
          pickUpForm()
        ) : (
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
              error={errors.countryCode}
              label="Country code"
              select={[countryCode, setCountryCode]}
              placeholder="&#9660;"
              countryCodes
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
                setErrors({ ...errors, phoneNumber: null });
                setPhoneNumber(e.target.value);
              }}
              error={errors.phoneNumber}
              label="Phone number"
              placeholder="Phone number without country code"
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
            />
            <Input
              error={errors.city}
              label="City"
              // Select prop which consists of city state and setState function
              select={[city, setCity]}
              placeholder="&#9660;"
              selectContent={["Amsterdam", "Rotterdam", "Den Haag"]}
            />
            <InputButton>Submit</InputButton>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
