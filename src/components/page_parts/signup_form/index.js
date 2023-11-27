"use client";
import { useContext, useEffect, useState } from "react";
//Style
import styles from "./Signup.module.scss";
//Components
import Input from "@/components/input";
import InputButton from "@/components/input_button";
//Icons
import Envelope from "@/icons/envelope";
import Lock from "@/icons/lock";
import Google from "@/icons/google";
import Apple from "@/icons/apple";
import Microsoft from "@/icons/microsoft";
//Firebase imports
import { FirebaseAuthUser } from "@/context/firebase/auth/context";
import { auth } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
//Toastify alert
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [errorPasswordRepeat, setErrorPasswordRepeat] = useState();
  const [showAlertState, setShowAlertState] = useState(false);
  const user = useContext(FirebaseAuthUser);
  // On user state change we add user to local react context
  onAuthStateChanged(auth, (userInfo) => {
    if (userInfo) {
      user.setUser(userInfo);
    } else {
      console.log("NO user");
    }
  });
  //Toastify alert check
  useEffect(() => {
    if (user.firebaseError && !showAlertState) {
      const message =
        user.firebaseError.code === "auth/email-already-in-use"
          ? "Email is already in use, please provide a different one"
          : user.firebaseError.code.split("/").length > 1
          ? user.firebaseError.code.split("/")[1].replace(/-/g, " ")
          : errorMessage.trim();

      // Show an alert using react-toastify
      toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });

      setShowAlertState(true);
      setTimeout(() => {
        setShowAlertState(false);
      }, 5000);
    }
  }, [user]);

  //Form inputs validity check as well as firebase user creation
  const onSubmit = (event) => {
    event.preventDefault();
    setErrorEmail(null);
    setErrorPassword(null);
    setErrorPasswordRepeat(null);

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    // Define avlidation rules
    const passwordRules = [
      {
        regex: /[A-Z]/,
        message: "Password must contain at least one uppercase letter",
      },
      {
        regex: /[a-z]/,
        message: "Password must contain at least one lowercase letter",
      },
      { regex: /\d/, message: "Password must contain at least one digit" },
      {
        regex: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/,
        message: "Password must contain at least one special character",
      },
    ];

    // Define minimum length
    const minLength = 8;
    if (!emailRegex.test(email)) {
      setErrorEmail("Invalid email");
      return;
    }

    if (!password) {
      setErrorPassword("Please provide a password");
      return;
    }

    if (password.length < minLength) {
      setErrorPassword(
        `Password must be at least ${minLength} characters long`
      );
      return;
    }

    for (const rule of passwordRules) {
      if (!rule.regex.test(password)) {
        setErrorPassword(rule.message);
        return;
      }
    }

    if (!errorPassword && !repeatPassword) {
      setErrorPasswordRepeat("Please repeat your password");
      return;
    }

    if (!errorPassword && password !== repeatPassword) {
      setErrorPasswordRepeat("Passwords do not match");
      return;
    }

    // Firebase auth code [START]
    if (
      !errorEmail &&
      !errorPassword &&
      !errorPasswordRepeat &&
      !showAlertState
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("success");
        })
        .catch((error) => {
          user.setError(error);
        });
    }

    //Login with email and password
  };

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.signupTitle}>
          <h1>Sign Up</h1>
        </div>
        <form onSubmit={onSubmit} className={styles.emailSignupContainer}>
          <Input
            error={errorEmail}
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setErrorEmail(null);
              setEmail(e.target.value);
            }}
            label="Please provide email"
          />
          <Input
            error={errorPassword}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setErrorPassword(null);
              setPassword(e.target.value);
            }}
            label="Please provide password"
          />
          <Input
            error={errorPasswordRepeat}
            placeholder="Password"
            type="password"
            value={repeatPassword}
            onChange={(e) => {
              setErrorPasswordRepeat(null);
              setRepeatPassword(e.target.value);
            }}
            label="Please repeat password"
          />
          <InputButton buttonStyle="fill" buttonColor="green">
            Sign Up
          </InputButton>
        </form>
        <div className={styles.dividerContainer}>
          <div className={styles.divider} />
          <div className={styles.dividerText}>OR</div>
          <div className={styles.divider} />
        </div>
        <div className={styles.otherMethodsContainer}>
          <InputButton
            buttonStyle="outline"
            buttonColor="grey"
            icon={<Google />}
          >
            Sign up with Google
          </InputButton>
          <InputButton
            buttonStyle="outline"
            buttonColor="grey"
            icon={<Apple />}
          >
            Sign up with Apple
          </InputButton>
          <InputButton
            buttonStyle="outline"
            buttonColor="grey"
            icon={<Microsoft />}
          >
            Sign up with Microsoft
          </InputButton>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUpForm;
