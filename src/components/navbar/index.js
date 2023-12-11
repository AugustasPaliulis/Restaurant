"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useContext, useRef } from "react";
import styles from "./Navbar.module.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

//Icons
import Person from "../../icons/person.js";
import Cart from "@/icons/cart";
import Search from "@/icons/search";
import Hamburger from "@/icons/hamburger";
import Cross from "@/icons/cross";
import Signout from "@/icons/signout";
import Lock from "@/icons/lock";
import Trash from "@/icons/trash";

// Firebase imports
import { auth } from "@/firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FirebaseAuthUser } from "@/context/firebase/auth/context";
import CartSidebar from "../cart_sidebar";

const Navbar = () => {
  const user = useContext(FirebaseAuthUser); // Getting user context
  const pathname = usePathname();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // State for changing navbar color, based on if it is scrolled
  const [showCart, setShowCart] = useState(false); // State for opening/closing cart side bar

  const divRef = useRef(); // Ref for closing cart side bar
  // State for checking if navbar color should be changed (Only on homepage it should)
  const [scrollCheck, setScrollCheck] = useState(
    pathname === "/" ? true : false
  );

  // Getting user and adding it to state if it is empty
  onAuthStateChanged(auth, (userInfo) => {
    if (userInfo) {
      user.setUser(userInfo);
    } else {
      return;
    }
  });

  // Hook for checking if Navbar color change on scroll should be performed. Color is changed only on Homepage (route="/").
  useEffect(() => {
    setScrolled(pathname === "/" ? false : true);
    setScrollCheck(pathname === "/" ? true : false);
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
    window.addEventListener("scroll", ChangeBackground);
  });
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
            <li className={pathname === "/about" ? styles.selected : ""}>
              <Link onClick={() => closeMenu()} href="/">
                About
              </Link>
            </li>
            <li className={pathname === "/shop" ? styles.selected : ""}>
              <Link onClick={() => closeMenu()} href="/">
                Shop
              </Link>
            </li>
            <li className={pathname === "/contact" ? styles.selected : ""}>
              <Link onClick={() => closeMenu()} href="/">
                Contact
              </Link>
            </li>
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
                <Link href="/">
                  <Person />
                </Link>
                {showDropdown && userDropdown()}
              </>
            ) : (
              <Link href="/signup">
                <Lock />
              </Link>
            )}
          </li>
          <li>
            <Search />
          </li>
          <li onClick={showCartMenu} className={styles.cartContainer}>
            {!user.user ? (
              <div className={styles.cartAmount}>{user.cart.length}</div>
            ) : null}
            <Cart />
          </li>
          <li>
            <button
              className={`${styles.desktopHidden} ${styles.hamburger}`}
              onClick={handleToggle}
            >
              {!navbarOpen ? <Hamburger /> : <Cross />}
            </button>
            <CartSidebar showCart={showCart} setShowCart={setShowCart} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
