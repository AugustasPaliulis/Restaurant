import styles from "./Review.module.scss";
import { Miniver } from "next/font/google";

import ArrowLeft from "@/icons/arrowLeft";
import ArrowRight from "@/icons/arrowRight";
import Quote from "@/icons/quote";
import rise from "../../../pictures/rise_home.png";
import Image from "next/image";
import Star from "@/icons/star";

const miniver = Miniver({ subsets: ["latin"], weight: "400" });

const HomeReview = () => {
  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewTextContainer}>
        <p className={miniver.className}>Testimonials</p>
        <h1>Customer Review</h1>
        <div className={styles.quotes}>
          <Quote />
          <Quote />
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          consectetur purus vitae dignissim pulvinar. Cras vel fringilla sem.
          Maecenas ut tempor nunc. Ut pulvinar efficitur lacus quis consequat.
          Suspendisse potenti. Nullam congue mi ut nulla vestibulum faucibus.
          Etiam tempor sapien placerat aliquam convallis
        </p>
        <div className={styles.reviewNavigationContainer}>
          <div className={styles.userContainer}>
            <p className={styles.userName}>Abdur Rahman</p>
          </div>
          <div className={styles.arrowsContainer}>
            <ArrowLeft /> <ArrowRight />
          </div>
        </div>
      </div>
      <div className={styles.reviewPictureContainer}>
        <Image src={rise} alt="rise" />
        <div className={styles.reviewMealDescription}>
          <div className={styles.titleContaier}>
            <div>
              <h1>Rise Bowl</h1>
              <div className={styles.starsContainer}>
                <Star fill="#195A00" stroke="none" />
                <Star fill="#195A00" stroke="none" />
                <Star fill="#195A00" stroke="none" />
                <Star fill="#195A00" stroke="none" />
                <Star fill="#195A00" stroke="none" />
              </div>
            </div>

            <h1 className={styles.price}>7.99$</h1>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur elit. Quisque diam
            pellentesque bibendum fringilla bibendum. Urna, elit augue urna,
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeReview;