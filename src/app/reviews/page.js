import Link from "next/link";
import styles from "./Reviews.module.scss";
import ReviewsList from "@/components/page_parts/reviews_list";

const ReviewsPage = () => {
  return (
    <div>
      <div className={styles.reviewHeroContainer}>
        <div className={styles.heroTextContainer}>
          <h1 className={styles.title}>Our reviews</h1>
          <div className={styles.navigation}>
            <Link href="/">Home </Link>
            &gt;
            <Link href="/reviews">Reviews</Link>
          </div>
        </div>
      </div>
      <div className={styles.leaveReviewContainer}>
        <h1>
          You can also leave a review <Link href="/reviews/add">here</Link>
        </h1>
      </div>
      <ReviewsList />
    </div>
  );
};

export default ReviewsPage;
