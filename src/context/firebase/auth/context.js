"use client";
//Top level context for user data and food order cart

import { createContext, useState, useEffect } from "react";

import {
  saveToSessionStorage,
  loadFromSessionStorage,
} from "@/context/session/cart_session";

export const FirebaseAuthUser = createContext(null);

export const FirebaseAuthContext = ({ children }) => {
  //user state
  const [user, setUser] = useState(null);

  //error state
  const [error, setError] = useState(null);
  // items cart state
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = loadFromSessionStorage("cart") || [];
    setCart(storedCart);
  }, []);

  return (
    <FirebaseAuthUser.Provider
      value={{
        user: user,
        setUser: setUser,
        firebaseError: error,
        setError: setError,
        cart: cart,
        setCart: setCart,
      }}
    >
      {children}
    </FirebaseAuthUser.Provider>
  );
};
