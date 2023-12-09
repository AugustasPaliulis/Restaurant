"use client";
//Top level context for user data and food order basket

import { createContext, useState } from "react";

export const FirebaseAuthUser = createContext(null);

export const FirebaseAuthContext = ({ children }) => {
  //user state
  const [user, setUser] = useState(null);

  //error state
  const [error, setError] = useState(null);

  // items basket state
  const [basket, setBasket] = useState([]);

  return (
    <FirebaseAuthUser.Provider
      value={{
        user: user,
        setUser: setUser,
        firebaseError: error,
        setError: setError,
        basket: basket,
        setBasket: setBasket,
      }}
    >
      {children}
    </FirebaseAuthUser.Provider>
  );
};
