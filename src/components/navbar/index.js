"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

import styles from "./Navbar.module.scss";
import search from "../../icons/search.svg";
import person from "../../icons/person.svg";
import cart from "../../icons/cart.svg";
import hamburger from "../../icons/hamburger.svg";
import cross from "../../icons/cross.svg";
import { useState } from "react";

import Person from "../../icons/person.js";
import Cart from "@/icons/cart";
import Search from "@/icons/search";
import Hamburger from "@/icons/hamburger";
import Cross from "@/icons/cross";

const Navbar = () => {
  const pathname = usePathname();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setNavbarOpen(false);
  };

  return (
    <div className={styles.navbarContainer}>
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
              <Link onClick={() => closeMenu()} href="/">
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
      <div className={styles.iconsContainer}>
        <ul>
          <li>
            {/* <Image src={search} alt="search" width="20" height="auto" /> */}
            <Search />
          </li>
          <li>
            {/* <Image src={person} alt="person" width="20" height="auto" /> */}
            <Person />
          </li>
          <li>
            {/* <Image src={cart} alt="cart" width="20" height="auto" /> */}
            <Cart />
          </li>

          <li>
            <button
              className={`${styles.desktopHidden} ${styles.hamburger}`}
              onClick={handleToggle}
            >
              {!navbarOpen ? <Hamburger /> : <Cross />}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
