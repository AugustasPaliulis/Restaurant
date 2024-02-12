"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./AccountData.module.scss";

import Input from "@/components/input";
import ToolTip from "@/components/info_tooltip";
import InputButton from "@/components/input_button";

import {
  sendEmailVerification,
  signOut,
  updateEmail,
  updatePassword,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { FirebaseAuthUser } from "@/context/firebase/auth/context";
import { auth, db } from "@/firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import Button from "@/components/button";
import ArrowLeft from "@/icons/arrowLeft";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Trash from "@/icons/trash";
import OrderHistory from "@/components/order_history_card";

const AccountData = () => {
  const user = useContext(FirebaseAuthUser);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [passwordFirst, setPasswordFirst] = useState("");
  const [passwordSecond, setPasswordSecond] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [savedData, setSavedData] = useState({});
  const [orderHistory, setOrderHistory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [emailTheSame, setEmailTheSame] = useState(true);
  const [alertShowing, setAlertShowing] = useState(false);
  const [stopRerouting, setStopRerouting] = useState(false);
  const emailToolTip = () => {
    return <>You can change your email here</>;
  };
  useEffect(() => {
    if (!user.user && !user.loadingUser && !stopRerouting) {
      router.push("/signup");
    } else if (user.user && user.user.email) {
      const docRef = getDoc(doc(db, "user_info", user.user.uid));
      docRef.then((doc) => {
        if (doc.exists()) {
          setSavedData(doc.data());
        }
      });

      const orderRef = getDocs(
        collection(db, "order_history", user.user.uid, "orders")
      );
      orderRef.then((orders) => {
        orders.forEach((order) => {
          setOrderHistory((prevOrderHistory) => [
            ...prevOrderHistory,
            order.data(),
          ]);
        });
      });
      setEmail(user.user.email);
    }
  }, [user]);

  const formSubmit = (e) => {
    e.preventDefault();
    setErrorEmail("");
    if (email !== user.user.email) {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(email)) {
        setErrorEmail("Invalid email");
        console.log("Invalid email");
        return;
      }
      if (errorEmail === "" && !alertShowing) {
        verifyBeforeUpdateEmail(auth.currentUser, email)
          .then(() => {
            if (!alertShowing) {
              setAlertShowing(true);
              toast.success("Email verification sent", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "light",
              });
              setTimeout(() => {
                setAlertShowing(false);
              }, 5000);
              console.log("Email verification sent");
            }
          })
          .catch((error) => {
            setStopRerouting(true);
            user.setAlert({
              message:
                error.code === "auth/requires-recent-login"
                  ? "You need to sign in again"
                  : error.message,
              type: "error",
            });
            if (error.code === "auth/requires-recent-login") {
              signOut(auth)
                .then(() => {
                  user.setUser(null);
                })
                .catch((error) => {
                  user.setError(error);
                });
              router.push("/signin?redirect_back=true");
            }
            setStopRerouting(false);
          });
      }
    } else {
      toast.error("Email is the same", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
      console.log("Email is the same");
    }
  };
  const passwordSubmit = (e) => {
    e.preventDefault();
    setErrorPassword("");

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.{8,})/;
    if (passwordFirst === "") {
      setErrorPassword("Password cannot be empty");
      return;
    }
    if (!passwordRegex.test(passwordFirst)) {
      setErrorPassword("Invalid password");
      return;
    }
    if (passwordFirst !== passwordSecond) {
      setErrorPassword("Passwords do not match");
      return;
    }
    if (errorPassword === "" && !alertShowing) {
      updatePassword(auth.currentUser, passwordFirst)
        .then(() => {
          user.setAlert({
            message: "Password updated",
            type: "success",
          });
          setPasswordFirst("");
          setPasswordSecond("");
        })
        .catch((error) => {
          setStopRerouting(true);
          user.setAlert({
            message:
              error.code === "auth/requires-recent-login"
                ? "You need to sign in again"
                : error.message,
            type: "error",
          });
          if (error.code === "auth/requires-recent-login") {
            signOut(auth)
              .then(() => {
                user.setUser(null);
              })
              .catch((error) => {
                user.setError(error);
              });
            router.push("/signin?redirect_back=true");
          }
          setStopRerouting(false);
        });
    }
  };

  useEffect(() => {
    if (user.user && email === user.user.email) {
      setEmailTheSame(true);
    } else {
      setEmailTheSame(false);
    }
  }, [email]);

  const deleteOrderData = () => {
    const docRef = doc(db, "user_info", user.user.uid);
    deleteDoc(docRef).then(() => {
      setSavedData({});
      toast.success("Order data deleted", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
    });
  };
  const passwordRequirements = () => {
    return (
      <>
        Password must be at least 8 characters long and contain:
        <ul>
          <li>at least one uppercase letter</li>
          <li>at least one lowercase letter</li>
          <li>at least one digit</li>
          <li>at least one special character</li>
        </ul>
      </>
    );
  };
  const showOrders = orderHistory.map((order, index) => {
    const totalPrice = order.items
      .reduce((total, item) => {
        return total + item.price;
      }, 0)
      .toFixed(2);
    return (
      <div key={index}>
        <OrderHistory order={order} totalPrice={totalPrice} />
      </div>
    );
  });

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      user.setAlert({
        message: "Email verification sent",
        type: "success",
      });
    });
  };
  return (
    <>
      <div className={styles.dataContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Account Data</h1>
          <p className={styles.verifiedDisclaimer}>
            {user.user && user.user.emailVerified ? "Verified" : null}
          </p>
          {user.user && !user.user.emailVerified && (
            <Button onClick={verifyEmail} buttonStyle="outline">
              Verify email
            </Button>
          )}
        </div>
        <div className={styles.completeData}>
          <div className={styles.data}>
            <div className={styles.email}>
              <h3>
                {showForm && <ArrowLeft onClick={() => setShowForm(false)} />}
                Email
              </h3>

              {!showForm && (
                <>
                  <p>{user.user && user.user.email}</p>
                  <Button onClick={() => setShowForm(true)}>
                    Change email
                  </Button>
                </>
              )}

              {showForm && (
                <>
                  <form onSubmit={(e) => formSubmit(e)}>
                    <Input
                      type="text"
                      placeholder="New email"
                      value={email}
                      error={errorEmail}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorEmail("");
                      }}
                      // tooltip={<ToolTip text={emailToolTip()} />}
                    />
                    <br />
                    <InputButton disabled={emailTheSame} type="submit">
                      Update Email
                    </InputButton>
                  </form>
                </>
              )}
            </div>
            <div className={styles.password}>
              <h3>Password</h3>
              <form onSubmit={passwordSubmit}>
                <Input
                  type="password"
                  placeholder="New password"
                  error={errorPassword}
                  value={passwordFirst}
                  label="Provide new password"
                  tooltip={<ToolTip text={passwordRequirements()} />}
                  onChange={(e) => {
                    setPasswordFirst(e.target.value);
                    setErrorPassword("");
                  }}
                />
                <Input
                  type="password"
                  placeholder="Repeat password"
                  value={passwordSecond}
                  error={errorPassword}
                  label="Repeat new password"
                  onChange={(e) => {
                    setPasswordSecond(e.target.value);
                  }}
                />
                <InputButton type="submit">Update Password</InputButton>
              </form>
            </div>
            <div className={styles.joined}>
              <h3>Joined</h3>
              <p>{user.user && user.user.metadata.creationTime}</p>
            </div>
          </div>
          <div className={styles.lastOrderData}>
            <h3>
              Last saved order info{" "}
              {Object.keys(savedData).length > 0 && (
                <Trash onClick={deleteOrderData} />
              )}
            </h3>

            {Object.keys(savedData).length > 0 ? (
              <div>
                <div>
                  <p className={styles.dataName}>First name:</p>
                  <p>{savedData["firstName"]}</p>
                </div>
                <div>
                  <p className={styles.dataName}>Last name:</p>
                  <p>{savedData["lastName"]}</p>
                </div>
                <div>
                  <p className={styles.dataName}>Address first:</p>
                  <p>{savedData["addressFirst"]}</p>
                </div>
                <div>
                  <p className={styles.dataName}>Address second:</p>
                  <p>{savedData["addressSecond"]}</p>
                </div>
                <div>
                  <p className={styles.dataName}>City:</p>
                  <p>{savedData["city"]}</p>
                </div>
                <div>
                  <p className={styles.dataName}>Zip:</p>
                  <p>{savedData["zip"]}</p>
                </div>
                <div>
                  <p className={styles.dataName}>Country code:</p>
                  <p>{savedData["countryCode"]}</p>
                </div>
                <div>
                  <p className={styles.dataName}>Phone number:</p>
                  <p>{savedData["phoneNumber"]}</p>
                </div>
              </div>
            ) : (
              <p>No saved order info</p>
            )}
          </div>
        </div>
        <div className={styles.orderHistory}>
          <h3>Order history</h3>
          <div className={styles.orders}>{showOrders}</div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AccountData;
