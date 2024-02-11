"use client";
//Top level context for user data and food order cart

import { createContext, useState, useEffect } from "react";

import {
  saveToSessionStorage,
  loadFromSessionStorage,
  loadCartId,
} from "@/context/session/cart_session";

export const FirebaseAuthUser = createContext(null);

export const FirebaseAuthContext = ({ children }) => {
  //user state
  const [user, setUser] = useState(null);

  //error state
  const [error, setError] = useState(null);
  // items cart state
  const [cart, setCart] = useState([]);
  // cart id state
  const [cartID, setCartID] = useState(null);

  //loading state for cart
  const [loadingCart, setLoadingCart] = useState(true);

  // loading state for user
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = (await loadFromSessionStorage("cart")) || [];
      setCart(storedCart);
      setLoadingCart(false);
    };

    loadCart();
  }, []);

  // load cart id
  useEffect(() => {
    const storedCartId = loadCartId("cart") || null;
    setCartID(storedCartId);
  }, [cart]);

  return (
    <FirebaseAuthUser.Provider
      value={{
        user: user,
        setUser: setUser,
        firebaseError: error,
        setError: setError,
        cart: cart,
        setCart: setCart,
        cartId: cartID,
        loadingCart: loadingCart,
        loadingUser: loadingUser,
        setLoadingUser: setLoadingUser,
      }}
    >
      {children}
    </FirebaseAuthUser.Provider>
  );
};
