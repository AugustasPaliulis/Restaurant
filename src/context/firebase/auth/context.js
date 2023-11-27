"use client";
import { createContext, useState } from "react";

export const FirebaseAuthUser = createContext(null);

export const FirebaseAuthContext = ({ children }) => {
  //user state
  const [user, setUser] = useState(null);

  //error state
  const [error, setError] = useState(null);

  return (
    <FirebaseAuthUser.Provider
      value={{
        user: user,
        setUser: setUser,
        firebaseError: error,
        setError: setError,
      }}
    >
      {children}
    </FirebaseAuthUser.Provider>
  );
};
