import styles from "./About.module.scss";
import { Miniver } from "next/font/google";

const miniver = Miniver({ subsets: ["latin"], weight: "400" });

import chicken from "../../../pictures/chicken_home.png";
import tacos from "../../../pictures/tacos_home.png";
import eggs from "../../../pictures/eggs.jpg";
import pancakes from "../../../pictures/pancakes.jpg";
import salad from "../../../pictures/salad_home.jpg";
import Image from "next/image";
import Button from "@/components/button";

const HomeAbout = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.picturesContainer}>
        <Image src={salad} alt="salad" />
        <div>
          <Image src={pancakes} alt="pancakes" />
          <Image src={eggs} alt="eggs" />
        </div>
      </div>
      <div className={styles.textContainer}>
        <p className={miniver.className}>About us</p>
        <h1>Food is and important part of a balanced diet</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam
          pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit
          augue urna, vitae feugiat pretium donec id elementum. Ultrices mattis
          vitae mus risus. Lacus nisi, et ac dapibus sit eu velit in consequat.
        </p>
        <div className={styles.buttonContainer}>
          <Button buttonSize="medium">Show more</Button>
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
