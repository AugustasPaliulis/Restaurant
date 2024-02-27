import styles from "./Review.module.scss";
import { Miniver } from "next/font/google";

import ArrowLeft from "@/icons/arrowLeft";
import ArrowRight from "@/icons/arrowRight";
import Quote from "@/icons/quote";
import rise from "../../../pictures/rise_home.webp";
import Image from "next/image";
import Star from "@/icons/star";
import axios from "axios";
import { db } from "@/firebase/config";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import EmptyStar from "@/icons/empty_star";
import ReviewModal from "./review_modal";

const HomeReview = async () => {
  const getReviews = async () => {
    const ref = collection(db, "reviews");
    try {
      const q = query(ref, orderBy("reviewData.date", "desc"), limit(4));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        data.reviewData.date = new Date(data.reviewData.date.seconds * 1000);
        return data;
      });
    } catch (error) {
      console.log(error);
    }
    return "Loading";
  };

  const reviews = await getReviews();

  return (
    <div className={styles.reviewContainer}>
      <ReviewModal reviews={reviews} />
    </div>
  );
};

export default HomeReview;
