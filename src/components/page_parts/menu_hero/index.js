import Image from "next/image";
import styles from "./Hero.module.scss";
import Link from "next/link";

const MenuHero = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroImage}></div>
      <div className={styles.heroTextContainer}>
        <h1 className={styles.title}>Our Menu</h1>
        <div className={styles.navigation}>
          <Link href="/">Home </Link>
          &gt;
          <Link href=""> Menu</Link>
        </div>
      </div>
    </div>
  );
};

export default MenuHero;
