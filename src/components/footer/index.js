"use client";
import Link from "next/link";
import Input from "../input";
import InputButton from "../input_button";
import styles from "./Footer.module.scss";
import PaperPlane from "@/icons/paperPlace";
import ContactInfo from "./contacts";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");

  return (
    <>
      {parts[1] !== "success" && pathname !== "/account" && (
        <div className={styles.footerContainer}>
          <div className={styles.contactContainer}>
            <ContactInfo />
          </div>
          <div className={styles.footerContentContainer}>
            <div className={styles.subscribeContainer}>
              <div className={styles.logoContainer}>
                <Link href="/">
                  F<span className={styles.logoColoredLetters}>oo</span>dtuck
                </Link>
              </div>
              <p>Subscribe our newsletter and get discount 25%off</p>
              <div className={styles.footerFormContainer}>
                <Input inputColor="green" />
                <InputButton>
                  <PaperPlane stroke="white" />
                </InputButton>
              </div>
            </div>

            {/* <div className={styles.linksContainer}>
          <h1>Links</h1>
          <ul className={styles.links}>
            <li>
              <Link href="/menu">Menu</Link>
            </li>
            <li>
              <Link href="/contacts">Contact us</Link>
            </li>
          </ul>
        </div> */}
          </div>
          <div className={styles.footerCopyrightContainer}>
            <p className={styles.copyrightDisclaimer}>
              Copyright © 2000-2020.logo.com. All rights reserved
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
