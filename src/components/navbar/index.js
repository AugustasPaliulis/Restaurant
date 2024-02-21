"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useContext, useRef } from "react";
import styles from "./Navbar.module.scss";
import { useEffect, useState } from "react";

// Toastify
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Icons
import Person from "../../icons/person.js";
import Cart from "@/icons/cart";
import Hamburger from "@/icons/hamburger";
import Cross from "@/icons/cross";
import Signout from "@/icons/signout";
import Lock from "@/icons/lock";

// Firebase imports
import { auth } from "@/firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FirebaseAuthUser } from "@/context/firebase/auth/context";

import CartSidebar from "../cart_sidebar";

// Window size hook
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    // Only execute this code on the client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
        });
      }

      // Add event listener for window resize
      window.addEventListener("resize", handleResize);

      // Call handler right away to update initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures effect runs only on mount

  return windowSize;
}

const Navbar = () => {
  const user = useContext(FirebaseAuthUser); // Getting user context
  const pathname = usePathname();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(pathname !== "/" ? true : false); // State for changing navbar color, based on if it is scrolled
  const [showCart, setShowCart] = useState(false); // State for opening/closing cart side bar
  const { width } = useWindowSize();
  const divRef = useRef(); // Ref for closing cart side bar
  // State for checking if navbar color should be changed (Only on homepage it should)
  const [scrollCheck, setScrollCheck] = useState(
    pathname === "/" ? true : false
  );

  // Getting user and adding it to state if it is empty
  onAuthStateChanged(auth, (userInfo) => {
    if (userInfo) {
      user.setUser(userInfo);
      user.setLoadingUser(false);
    } else {
      user.setLoadingUser(false);
      return;
    }
  });

  // Hook for checking if Navbar color change on scroll should be performed. Color is changed only on Homepage (route="/").
  useEffect(() => {
    setScrollCheck(pathname === "/" ? true : false);
    setScrolled(pathname === "/" ? false : true);
  }, [pathname]);
  // Mobile navbar menu toggling function
  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };
  // Mobile navbar menu closing function
  const closeMenu = () => {
    setNavbarOpen(false);
  };

  // Navbar background color change code on scroll
  useEffect(() => {
    const ChangeBackground = () => {
      if (scrollCheck) {
        setScrolled(false);
        if (window.scrollY > 10) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    };
    if (scrollCheck) {
      window.addEventListener("scroll", ChangeBackground);
    }
    return () => {
      if (scrollCheck) {
        window.removeEventListener("scroll", ChangeBackground);
      }
    };
  }, [scrollCheck]);
  // Firebase signout
  const signoutUser = () => {
    signOut(auth)
      .then(() => {
        user.setUser(null);
      })
      .catch((error) => {
        user.setError(error);
      });
  };

  // alert
  useEffect(() => {
    if (user.alert.type) {
      toast[user.alert.type](user.alert.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
      user.setAlert({});
    }
  }, [user.alert]);

  //User dropdown code
  const [showDropdown, setShowDropdown] = useState(false);
  const userDropdown = () => {
    return (
      <div onClick={signoutUser} className={styles.dropdownContent}>
        <div>
          <Signout /> Sign out
        </div>
      </div>
    );
  };
  const showUserDropdown = () => {
    setShowDropdown(true);
  };

  const hideUserDowpdown = () => {
    setShowDropdown(false);
  };

  const showCartMenu = () => {
    setShowCart(!showCart);
  };
  return (
    <>
      <div
        className={`${styles.navbarContainer} ${
          scrolled ? styles.scrolled : null
        }`}
      >
        <div className={styles.navbarLeftContainer}>
          <div className={styles.logoContainer}>
            <Link href="/">
              F<span className={styles.logoColoredLetters}>oo</span>dtuck
            </Link>
          </div>
          <div className={styles.linkingContainer}>
            {/* HAMBURGER */}

            <ul className={navbarOpen ? styles.show : null}>
              <li className={pathname === "/" ? styles.selected : ""}>
                <Link onClick={() => closeMenu()} href="/">
                  Home
                </Link>
              </li>
              <li className={pathname === "/menu" ? styles.selected : ""}>
                <Link onClick={() => closeMenu()} href="/menu">
                  Menu
                </Link>
              </li>
              {/* <li className={pathname === "/about" ? styles.selected : ""}>
                <Link onClick={() => closeMenu()} href="/#about">
                  About
                </Link>
              </li>
              <li className={pathname === "/shop" ? styles.selected : ""}>
                <Link onClick={() => closeMenu()} href="/">
                  Shop
                </Link>
              </li> */}
              <li className={pathname === "/contacts" ? styles.selected : ""}>
                <Link onClick={() => closeMenu()} href="/contacts">
                  Contacts
                </Link>
              </li>
              {user.user && (
                <li>
                  <div
                    onClick={signoutUser}
                    className={`${styles.signOut} ${styles.desktopHidden}`}
                  >
                    <Signout />
                    Sign out
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div
          className={`${styles.iconsContainer} ${
            scrolled ? styles.scrolled : null
          }`}
        >
          <ul>
            <li onMouseOver={showUserDropdown} onMouseOut={hideUserDowpdown}>
              {user.user ? (
                <>
                  <Link href="/account">
                    <Person />
                  </Link>
                  {showDropdown && width > 840 && userDropdown()}
                </>
              ) : (
                <Link href="/signup">
                  <Lock />
                </Link>
              )}
            </li>
            <li
              ref={divRef}
              onClick={showCartMenu}
              className={styles.cartContainer}
            >
              <div className={styles.cartAmount}>{user.cart?.length || 0}</div>

              <Cart />
            </li>
            <li>
              <button
                className={`${styles.desktopHidden} ${styles.hamburger}`}
                onClick={handleToggle}
              >
                {!navbarOpen ? <Hamburger /> : <Cross />}
              </button>
              <CartSidebar
                showCart={showCart}
                setShowCart={setShowCart}
                iconRef={divRef}
              />
            </li>
          </ul>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;
