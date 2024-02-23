import styles from "./AddReview.module.scss";
import ReviewForm from "@/components/page_parts/add_review_form";
import Link from "next/link";

const AddReviewPage = () => {
  return (
    <>
      <div className={styles.reviewHeroContainer}>
        <div className={styles.heroTextContainer}>
          <h1 className={styles.title}>Add review</h1>
          <div className={styles.navigation}>
            <Link href="/">Home </Link>
            &gt;
            <Link href="/reviews"> Reviews</Link>
            &gt;
            <Link href=""> Add reviews</Link>
          </div>
        </div>
      </div>
      <ReviewForm />
    </>
  );
};

export default AddReviewPage;
