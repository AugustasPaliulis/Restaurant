"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { auth, googleProvider } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";
//Toastify alert
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Loader from "@/components/loader";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [errorPasswordRepeat, setErrorPasswordRepeat] = useState();
  const [showAlertState, setShowAlertState] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);
  const user = useContext(FirebaseAuthUser); //Getting app user context
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
  // useEffect(() => {
  //   if (user.user) {
  //     router.push("/");
  //   }
  // });
  //Toastify alert check
  useEffect(() => {
    if (user.firebaseError && !showAlertState && !loadingSignup) {
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
  }, [user, loadingSignup, showAlertState]);

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
      setErrorPassword("Please provide password");
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

    //Signup with email and password
    if (
      !errorEmail &&
      !errorPassword &&
      !errorPasswordRepeat &&
      !showAlertState
    ) {
      setLoadingSignup(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setLoadingSignup(false);
          console.log("success");
          router.push("/");
        })
        .catch((error) => {
          setLoadingSignup(false);
          user.setError(error);
        });
    }
  };
  //Signup with google
  const googleSignUp = () => {
    setLoadingSignup(true);
    signInWithRedirect(auth, googleProvider);
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        user.setUser(result.user);
        setLoadingSignup(false);
        router.push("/");
      })
      .catch((error) => {
        setLoadingSignup(false);
        user.setError(error);
      });
  };
  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.signupTitle}>
          <h1>Sign up</h1>
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
          <InputButton
            disabled={loadingSignup ? true : false}
            buttonStyle="fill"
            buttonColor="green"
          >
            {loadingSignup ? <Loader /> : "Sign up"}
          </InputButton>
        </form>
        <div className={styles.signinDislaimer}>
          <p>Already have an account? Sign In then!</p>
        </div>
        <Link href="/signin">
          <InputButton buttonStyle="outline" buttonColor="grey">
            Sign in
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
            onClick={googleSignUp}
            icon={<Google />}
          >
            Sign up with Google
          </InputButton>
          {/* <InputButton
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
          </InputButton> */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUpForm;
