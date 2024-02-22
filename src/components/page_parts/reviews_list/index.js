import { collection, getDocs } from "firebase/firestore";

import { db } from "@/firebase/config";

import styles from "./ReviewsList.module.scss";

import EmptyStar from "@/icons/empty_star";
import Quote from "@/icons/quote";

const ReviewsList = async () => {
  const collectionRef = collection(db, "reviews");
  const reviews = [];
  await getDocs(collectionRef).then((snapshot) => {
    snapshot.forEach((doc) => {
      reviews.push(doc.data());
    });
  });

  const reviewList = reviews.map((review, index) => {
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

        <div className={styles.reviewText}>{review.reviewData.review}</div>
        <div className={styles.rating}>
          {Array.from({ length: review.reviewData.rating + 1 }, (_, i) => (
            <EmptyStar key={i} className={styles.filledStar} />
          ))}
          {Array.from({ length: 5 - review.reviewData.rating - 1 }, (_, i) => (
            <EmptyStar key={i} />
          ))}
        </div>
        <div className={styles.name}>{review.reviewData.name}</div>
        <div className={styles.date}>
          {new Date(review.reviewData.date.toDate()).toLocaleDateString()}
        </div>
      </div>
    );
  });

  return <div className={styles.reviewsContainer}>{reviewList}</div>;
};

export default ReviewsList;
