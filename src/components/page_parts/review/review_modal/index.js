"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./ReviewModal.module.scss";

import Quote from "@/icons/quote";
import EmptyStar from "@/icons/empty_star";
import rise from "@/pictures/rise_home.webp";
import ArrowLeft from "@/icons/arrowLeft";
import ArrowRight from "@/icons/arrowRight";

import { Miniver } from "next/font/google";

const miniver = Miniver({ subsets: ["latin"], weight: "400" });

const ReviewModal = ({ reviews }) => {
  const [pages, setPages] = useState(4);
  const [shownPage, setShownPage] = useState(0);

  const showReview = () => {
    return reviews.map((review, index) => {
      return (
        <div className={styles.review} key={index}>
          <div className={styles.reviewTextContainer}>
            <p>{review.reviewData.review}</p>

            <div className={styles.userContainer}>
              <p className={styles.userName}>{review.reviewData.name}</p>
            </div>
          </div>
          <div className={styles.reviewPictureContainer}>
            <Image src={rise} alt="rise" />
            <div className={styles.reviewMealDescription}>
              <div className={styles.titleContaier}>
                <div>
                  <h1>
                    {review.reviewData.meal
                      ? review.reviewData.meal
                      : "All round review"}
                  </h1>
                  <div className={styles.starsContainer}>
                    {Array.from(
                      { length: review.reviewData.rating },
                      (_, i) => (
                        <EmptyStar className={styles.fullStar} key={i} />
                      )
                    )}
                    {Array.from(
                      { length: 4 - review.reviewData.rating },
                      (_, i) => (
                        <EmptyStar key={i} />
                      )
                    )}

                    <EmptyStar />
                  </div>
                </div>
                {review.reviewData.meal && (
                  <h1 className={styles.price}>7.99$</h1>
                )}
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur elit. Quisque diam
                pellentesque bibendum fringilla bibendum. Urna, elit augue urna,
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  // Animation for carousel
  const [transform, setTransform] = useState(0);

  useEffect(() => {
    setTransform(-shownPage * 100);
  }, [shownPage]);

  // Carousel navigation
  const navigateLeft = () => {
    if (shownPage > 0) {
      setShownPage(shownPage - 1);
    } else {
      setShownPage(pages - 1);
    }
  };
  const navigateRight = () => {
    if (shownPage < pages - 1) {
      setShownPage(shownPage + 1);
    } else {
      setShownPage(0);
    }
  };

  return (
    <>
      <div className={styles.titleContainer}>
        <p className={miniver.className}>Testimonials</p>
        <h1>Latest customer reviews</h1>
        <div className={styles.quotes}>
          <Quote />
          <Quote />
        </div>
      </div>
      <div
        className={styles.reviewsLayout}
        style={{ transform: `translateX(${transform}%)` }}
      >
        {showReview()}
      </div>
      <div className={styles.navigation}>
        <div className={styles.arrowsContainer}>
          <ArrowLeft onClick={() => navigateLeft()} />{" "}
          <ArrowRight onClick={() => navigateRight()} />
        </div>
        <div className={styles.bubblesContainer}>
          {Array.from({ length: pages }, (_, i) => (
            <span
              className={`${styles.bubble} ${
                i === shownPage ? styles.active : ""
              }`}
              key={i}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewModal;
