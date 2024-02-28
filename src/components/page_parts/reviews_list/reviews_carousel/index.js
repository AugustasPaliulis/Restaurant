"use client";
import { useEffect, useState } from "react";
import styles from "./Carousel.module.scss";

import EmptyStar from "@/icons/empty_star";
import Quote from "@/icons/quote";
import ArrowLeft from "@/icons/arrowLeft";
import ArrowRight from "@/icons/arrowRight";
const ReviewsCarousel = ({ items }) => {
  const [pages, setPages] = useState(0);
  const [shownPage, setShownPage] = useState(0);

  useEffect(() => {
    if (items) {
      setPages(items.length);
    }
  }, []);

  // Animation for carousel
  const [transform, setTransform] = useState(0);
  useEffect(() => {
    setTransform(-shownPage * 100 - 10);
  }, [shownPage]);
  const carouselPages = () => {
    if (items) {
      // Increment amount of pages in carousel
      return items.map((page, index) => {
        return (
          <div key={index} className={styles.carouselPage}>
            {page.map((review, index) => {
              return (
                <div key={index} className={styles.review}>
                  <div className={styles.quotes}>
                    <Quote width={15} height={24} />
                    <Quote width={15} height={24} />
                  </div>
                  <div className={styles.reviewTitle}>
                    {review.reviewData.meal ? (
                      <>{review.reviewData.meal}, meal review</>
                    ) : (
                      "All round restaurant review"
                    )}
                  </div>

                  <div className={styles.reviewText}>
                    {review.reviewData.review}
                  </div>
                  <div className={styles.rating}>
                    {Array.from(
                      { length: review.reviewData.rating + 1 },
                      (_, i) => (
                        <EmptyStar key={i} className={styles.filledStar} />
                      )
                    )}
                    {Array.from(
                      { length: 5 - review.reviewData.rating - 1 },
                      (_, i) => (
                        <EmptyStar key={i} />
                      )
                    )}
                  </div>
                  <div className={styles.name}>{review.reviewData.name}</div>
                  <div className={styles.date}>{review.reviewData.date}</div>
                </div>
              );
            })}
          </div>
        );
      });
    } else {
      return <div>Loading...</div>;
    }
  };
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
  useEffect(() => {
    console.log(shownPage);
  }, [shownPage]);
  return (
    <div className={styles.carousel}>
      <div
        className={styles.carouselContainer}
        style={{ transform: `translateX(${transform}%)` }}
      >
        {carouselPages()}
      </div>
      <div className={styles.navigation}>
        <ArrowLeft onClick={() => navigateLeft()} />{" "}
        <div className={styles.pageIndicator}>
          {shownPage + 1} / {items.length}
        </div>
        <ArrowRight onClick={() => navigateRight()} />
      </div>
    </div>
  );
};
export default ReviewsCarousel;
