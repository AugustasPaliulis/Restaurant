import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOafxbbrCtWn9i8y8giZpIt6EqHWIXgNs",
  authDomain: "restaurant-708b2.firebaseapp.com",
  projectId: "restaurant-708b2",
  storageBucket: "restaurant-708b2.appspot.com",
  messagingSenderId: "1003778731117",
  appId: "1:1003778731117:web:d642138d3a7d5eeb286364",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

// Cia uzkomentuota useState hook'as nes kyla problemu su state'o naudojimu ne funkcijoje
//Reikia padaryti state'a useriam bendrai
//Kyla kitu problemu su auth taip pat

//user state
// export const [user, setUser] = useState();

//error state
// export const [error, setError] = useState();

// //Creating user with email and password
// export const userCreateUserWithEmailAndPassword =
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // setUser(userCredential.user);
//     })
//     .catch((error) => {
//       // setError(error);
//     });

// //Login with email and password

// export const userSignInWithEmailAndPassword = signInWithEmailAndPassword(
//   auth,
//   email,
//   password
// )
//   .then((userCredential) => {
//     // setUser(userCredential.user);
//   })
//   .catch((error) => {
//     // setError(error);
//   });

// //Sign out
// export const userSignOut = signOut(auth)
//   .then(() => {
//     // setUser(null);
//   })
//   .catch((error) => {
//     // setError(error);
//   });

// TODO:
// Add Firestore config
// Add Google auth
