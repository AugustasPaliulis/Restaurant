import Button from "@/components/button";
import styles from "./Hero.module.scss";
import Image from "next/image";
import { Miniver } from "next/font/google";

const miniver = Miniver({ subsets: ["latin"], weight: "400" });

import bowl from "../../../pictures/salad_bowl.png";
import bg from "../../../pictures/hero_bg.png";

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroInfoContainer}>
        {/* Buttons, text, info */}
        <div className={styles.heroText}>
          <p className={miniver.className}>Healthy & Tasty Food</p>
          <h1 className={styles.heroTitle}>Enjoy healthy life & tasty food</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sed
            pharetra dictum neque massa congue
          </p>
        </div>
        <div className={styles.buttonsContiner}>
          <Button buttonSize="medium">Show more</Button>
          <Button buttonStyle="outline" buttonSize="medium">
            Show more
          </Button>
        </div>
      </div>
      <div className={styles.heroImageContainer}>
        {/* Image */}
        <Image src={bowl} alt="salad" width={3913} height={3921} />
        <div className={styles.heroBackground}></div>
        <Image
          className={styles.heroBackground}
          src={bg}
          alt="background"
          width={1067}
          height={927}
        />
      </div>
    </div>
  );
};

export default Hero;
