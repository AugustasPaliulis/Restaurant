import styles from "./Why.module.scss";
import Image from "next/image";
import { Miniver } from "next/font/google";

import chopping from "../../../pictures/chopping_home.png";
import salad from "../../../pictures/salad_home.png";
import Truck from "@/icons/truck";
import Timer from "@/icons/timer";
import HamburgerHome from "@/icons/hamburgerHome";
import Factory from "@/icons/factory";

const miniver = Miniver({ subsets: ["latin"], weight: "400" });

const WhyBest = () => {
  return (
    <div className={styles.whyContainer}>
      <div className={styles.picturesContainer}>
        <Image src={chopping} alt="chopping" />
        <Image className={styles.topImage} src={salad} alt="salad" />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.text}>
          <p className={miniver.className}>Why choose us?</p>
          <h1>Why we are the best?</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            diam pellentesque bibendum non dui volutpat fringilla bibendum.
            Urna, elit augue urna, vitae feugiat pretium donec id elementum.
            Ultrices mattis sed vitae mus risus. Lacus nisi, et ac dapibus sit
            eu velit in consequat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sed
            pharetra dictum neque massa congue
          </p>
        </div>
        <div className={styles.advantages}>
          <div>
            <Truck />
            Fast delivery
          </div>
          <div>
            <Timer />
            24/7 services
          </div>
          <div>
            <HamburgerHome />
            Fresh food
          </div>
          <div>
            <Factory />
            Quality maintain
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyBest;
