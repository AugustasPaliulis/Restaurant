"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./AccountData.module.scss";

import Input from "@/components/input";
import ToolTip from "@/components/info_tooltip";
import InputButton from "@/components/input_button";

import { signOut, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
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

const AccountData = () => {
  const user = useContext(FirebaseAuthUser);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [savedData, setSavedData] = useState({});
  const [orderHistory, setOrderHistory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [emailTheSame, setEmailTheSame] = useState(true);
  const [alertShowing, setAlertShowing] = useState(false);
  const emailToolTip = () => {
    return <>You can change your email here</>;
  };
  useEffect(() => {
    if (!user.user && !user.loadingUser) {
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
            if (!alertShowing) {
              setAlertShowing(true);
              toast.error(
                error.code === "auth/requires-recent-login"
                  ? "You need to sign in again"
                  : error.message,
                {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  progress: undefined,
                  theme: "light",
                }
              );
              setTimeout(() => {
                setAlertShowing(false);
                if (error.code === "auth/requires-recent-login") {
                  signOut(auth)
                    .then(() => {
                      user.setUser(null);
                    })
                    .catch((error) => {
                      user.setError(error);
                    });
                  router.push("/signin");
                }
              }, 5000);
            }
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
  const showOrders = orderHistory.map((order, index) => {
    const totalPrice = order.items.reduce((total, item) => {
      return total + item.price;
    }, 0);
    return (
      <div key={index} className={styles.order}>
        <p>Ordered items: </p>
        {order.items.map((item, index) => {
          return (
            <div key={index}>
              {item.mealName}x{item.quantity} {item.price}
            </div>
          );
        })}
        <div className={styles.divider} />
        <p>Total price: {totalPrice}</p>
      </div>
    );
  });
  return (
    <>
      <div className={styles.dataContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Account Data</h1>
          <p className={styles.verifiedDisclaimer}>
            {user.user && user.user.emailVerified ? "Verified" : null}
          </p>
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
