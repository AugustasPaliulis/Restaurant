"use client";
import Input from "@/components/input";
import styles from "./Signin.module.scss";
import InputButton from "@/components/input_button";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Google from "@/icons/google";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { auth, googleProvider } from "@/firebase/config";
import { FirebaseAuthUser } from "@/context/firebase/auth/context";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(null);
  const [showAlertState, setShowAlertState] = useState(false);
  const [loadingSignIn, setloadingSignIn] = useState(false);
  const user = useContext(FirebaseAuthUser);
  const router = useRouter();
  // On user state change we add user to local react context
  onAuthStateChanged(auth, (userInfo) => {
    if (userInfo) {
      user.setUser(userInfo);
    } else {
      console.log("NO user");
    }
  });
  // Cheking if user is logged in and then redirecting back to homepage
  //   useEffect(() => {
  //     if (user.user) {
  //       router.push("/");
  //     }
  //   });
  useEffect(() => {
    if (user.firebaseError && !showAlertState && !loadingSignIn) {
      const message =
        user.firebaseError.code === "auth/invalid-login-credentials"
          ? "Incorrect email/password"
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
        user.setError(null);
      }, 5000);
    }
  }, [user, loadingSignIn, showAlertState]);

  const onSubmit = (event) => {
    event.preventDefault();
    setErrorEmail(null);
    setErrorPassword(null);

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

    if (!emailRegex.test(email)) {
      setErrorEmail("Invalid email");
      return;
    }
    if (!password) {
      setErrorPassword("Please provide your password");
      return;
    }

    if (!errorEmail && !errorPassword && !showAlertState) {
      setloadingSignIn(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setloadingSignIn(false);
          console.log("success");
          router.push("/");
        })
        .catch((error) => {
          setloadingSignIn(false);
          user.setError(error);
        });
    }
  };
  const googleSignIn = () => {
    setloadingSignIn(true);
    signInWithRedirect(auth, googleProvider);
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        user.setUser(result.user);
        setloadingSignIn(false);
        router.push("/");
      })
      .catch((error) => {
        setloadingSignIn(false);
        user.setError(error);
      });
  };
  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.signinTitle}>
          <h1>Sign in</h1>
        </div>
        <form onSubmit={onSubmit} className={styles.emailSigninContainer}>
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
          <InputButton
            disabled={loadingSignIn ? true : false}
            buttonStyle="fill"
            buttonColor="green"
          >
            {!loadingSignIn ? "Sign In" : <Loader />}
          </InputButton>
        </form>
        <div className={styles.signupDislaimer}>
          <p>Don{"'"}t have and account? Sign Up then!</p>
        </div>
        <Link href="/signup">
          <InputButton buttonStyle="outline" buttonColor="grey">
            Sign up
          </InputButton>
        </Link>
        <div className={styles.dividerContainer}>
          <div className={styles.divider} />
          <div className={styles.dividerText}>OR</div>
          <div className={styles.divider} />
        </div>
        <div className={styles.otherMethodsContainer}>
          <InputButton
            buttonStyle="outline"
            buttonColor="grey"
            onClick={googleSignIn}
            icon={<Google />}
          >
            Sign in with Google
          </InputButton>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignInForm;
