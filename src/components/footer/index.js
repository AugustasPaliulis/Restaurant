import Link from "next/link";
import Input from "../input";
import InputButton from "../input_button";
import styles from "./Footer.module.scss";
import PaperPlane from "@/icons/paperPlace";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
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
        <div className={styles.contactContainer}>
          <h1>Contact Us</h1>
          <ul className={styles.contactInfo}>
            <li>Kolkata India , 3rd Floor, Office 45</li>
            <li>00965 - 96659986</li>
            <li>M.Alyaqout@4house.Co</li>
            <li>Sun - Sat / 10:00 AM - 8:00 PM</li>
          </ul>
        </div>
        <div className={styles.linksContainer}>
          <h1>Links</h1>
          <ul className={styles.links}>
            <li>
              <Link href="/">Menu</Link>
            </li>
            <li>
              <Link href="/"> About</Link>
            </li>
            <li>
              <Link href="/">Shop</Link>
            </li>
            <li>
              <Link href="/">Contact us</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footerCopyrightContainer}>
        <p className={styles.copyrightDisclaimer}>
          Copyright © 2000-2020.logo.com. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
