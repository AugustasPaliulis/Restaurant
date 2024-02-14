"use client";

import Input from "@/components/input";
import styles from "./Form.module.scss";
import { useEffect, useState, useContext } from "react";
import InputButton from "@/components/input_button";
import restaurants from "@/utils/restaurants.json";
import { motion, AnimatePresence } from "framer-motion";
import { FirebaseAuthUser } from "@/context/firebase/auth/context";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import ConfirmOrder from "@/components/confirm_order";
import { db } from "@/firebase/config";
import { getDoc, doc } from "firebase/firestore";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@/components/button";

import { redirectToCheckout } from "@/stripe/redirect";

const CheckoutForm = () => {
  const user = useContext(FirebaseAuthUser); // Getting user context
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fullData, setFullData] = useState({});
  const [dataFound, setDataFound] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  // Router
  const parameters = useParams();
  const router = useRouter();

  // Pickup restaurant sate and state for showing pickup form
  const [pickup, setPickup] = useState(false);
  const [restaurant, setRestaurant] = useState("");

  //Use effect for getting user info from firestore
  console.log(user.cart);
  useEffect(() => {
    if (user.user) {
      const docRef = getDoc(doc(db, "user_info", user.user.uid));
      docRef.then((doc) => {
        if (doc.exists()) {
          setShowAlert(true);
          setDataFound(true);
          const data = doc.data();
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setPhoneNumber(data.phoneNumber);
          if (data.restaurant) {
            setRestaurant(data.restaurant);
          } else {
            setAddressFirst(data.addressFirst);
            setAddressSecond(data.addressSecond);
            setZip(data.zip);
          }
          setCity(data.city);
          setCountryCode(data.countryCode);

          if (data.restaurant) {
            setFullData({
              firstName: data.firstName,
              lastName: data.lastName,
              phoneNumber: data.phoneNumber,
              restaurant: data.restaurant,
              city: data.city,
              countryCode: data.countryCode,
            });
          } else {
            setFullData({
              firstName: data.firstName,
              lastName: data.lastName,
              phoneNumber: data.phoneNumber,
              addressFirst: data.addressFirst,
              addressSecond: data.addressSecond,
              zip: data.zip,
              city: data.city,
              countryCode: data.countryCode,
            });
          }

          setIsSubmitted(true);
        }
      });
    }
  }, [user.user]);
  useEffect(() => {
    console.log(showAlert);
    if (showAlert && dataFound) {
      toast.success("Customer data found!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [showAlert]);
  // Use effects for resetting error state when select input is changed:
  // Use effect for resetting country code error state when code is selected
  useEffect(() => {
    setErrors({ ...errors, countryCode: null });
    if (countryCode !== fullData.countryCode) {
      setDataFound(false);
    }
  }, [countryCode]);
  // Use effect for resetting restaurant error state when restaurant is changed
  useEffect(() => {
    setErrors({ ...errors, restaurant: null });
    if (restaurant !== fullData.restaurant) {
      setDataFound(false);
    }
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

  // Use effect for checking if current cart id matches the one in url
  useEffect(() => {
    if (!user.loadingCart && parameters.order !== user.cartId) {
      router.push("/menu");
    }
  }, []);

  // Code for pickup (if user wants to pick up the order) information form
  // Pickup form submit code
  const pickUpSubmit = (event) => {
    event.preventDefault();
    // Check if all fields are filled
    if (!user.user) {
      return;
    }
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
    if (restaurant === "Select city first") {
      newErrors.restaurant = "Select city first";
    }
    // Update the errors state
    setErrors(newErrors);

    // If there are no errors, proceed with form submission logic
    if (Object.keys(newErrors).length === 0) {
      setFullData({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        city: city,
        restaurant: restaurant,
        countryCode: countryCode,
      });
      setIsSubmitted(true);
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
          value={firstName}
        />
        <Input
          onChange={(e) => {
            setErrors({ ...errors, lastName: null });
            setLastName(e.target.value);
          }}
          error={errors.lastName}
          label="Last name"
          value={lastName}
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
          label="Phone number (no code)"
          placeholder="Phone number"
          value={phoneNumber}
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
              ? restaurants[city.toLowerCase()].map(
                  (restaurant) => restaurant.name
                )
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
    if (!user.user) {
      return;
    }
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
      setFullData({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        addressFirst: addressFirst,
        addressSecond: addressSecond,
        zip: zip,
        city: city,
        countryCode: countryCode,
      });
      setIsSubmitted(true);
    }
  };
  return (
    <>
      <Button
        onClick={() => {
          redirectToCheckout(user.cart);
        }}
      >
        BUY
      </Button>
      {!user.user && (
        <div className={styles.overlay}>
          Please{"\u00A0"}
          <Link href={{ pathname: "/signin", query: { redirect_back: true } }}>
            Sign in
          </Link>{" "}
          {"\u00A0"}or{"\u00A0"}
          <Link href={{ pathname: "/signup", query: { redirect_back: true } }}>
            Sign up
          </Link>
        </div>
      )}
      {!isSubmitted ? (
        <div
          className={`${styles.formContainer} ${
            !user.user && styles.blurredContainer
          }`}
        >
          <div className={styles.formTitleContainer}>
            <h1>Delivery information</h1>
          </div>
          <div className={styles.inputsContainer}>
            <div className={styles.pickupCheckBox}>
              <input
                type="checkbox"
                name="pickup"
                value="pickup"
                checked={pickup}
                onChange={(e) => {
                  setPickup(e.target.checked);
                  setErrors({});
                }}
              />
              <p>I will pick up my order in one of the restaurants</p>
            </div>
            {pickup ? (
              pickUpForm()
            ) : (
              <form onSubmit={submit}>
                <Input
                  onChange={(e) => {
                    setErrors({ ...errors, firstName: null });
                    setFirstName(e.target.value);
                    setDataFound(false);
                  }}
                  error={errors.firstName}
                  label="First name"
                  value={firstName}
                />
                <Input
                  onChange={(e) => {
                    setErrors({ ...errors, lastName: null });
                    setLastName(e.target.value);
                    setDataFound(false);
                  }}
                  error={errors.lastName}
                  label="Last name"
                  value={lastName}
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
                    setDataFound(false);
                  }}
                  error={errors.addressFirst}
                  label="Address"
                  value={addressFirst}
                />
                <Input
                  onChange={(e) => {
                    setErrors({ ...errors, phoneNumber: null });
                    setPhoneNumber(e.target.value);
                    setDataFound(false);
                  }}
                  error={errors.phoneNumber}
                  label="Phone number (no code)"
                  placeholder="Phone number"
                  value={phoneNumber}
                />
                <Input
                  onChange={(e) => {
                    setErrors({ ...errors, addressSecond: null });
                    setAddressSecond(e.target.value);
                    setDataFound(false);
                  }}
                  error={errors.addressSecond}
                  label="Address line 2"
                  value={addressSecond}
                />
                <Input
                  onChange={(e) => {
                    setErrors({ ...errors, zip: null });
                    setZip(e.target.value);
                    setDataFound(false);
                  }}
                  error={errors.zip}
                  label="Zip code"
                  value={zip}
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
      ) : (
        <motion.div
          className={styles.ConfirmOrder}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
        >
          <ConfirmOrder
            data={fullData}
            getback={setIsSubmitted}
            found={dataFound}
          />
        </motion.div>
      )}
    </>
  );
};

export default CheckoutForm;
