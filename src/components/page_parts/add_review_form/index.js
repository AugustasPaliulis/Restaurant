"use client";
import { useEffect, useState } from "react";

import styles from "./ReviewForm.module.scss";

import Input from "@/components/input";
import InputButton from "@/components/input_button";
import EmptyStar from "@/icons/empty_star";
import Star from "@/icons/star";
const ReviewForm = () => {
  const [meal, setMeal] = useState(""); // Meal stripe prod id [optional]
  const [rating, setRating] = useState(null); // Rating of the review [1-5]
  const [name, setName] = useState(""); // Name of the reviewer
  const [review, setReview] = useState(""); // Review text
  const [hoveredStar, setHoveredStar] = useState(null); // Hovered star
  const addReview = (e) => {
    e.preventDefault();
    console.log("Review added");
  };

  return (
    <form onSubmit={(e) => addReview(e)} className={styles.reviewFormContainer}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        label="Your name"
      />
      <Input
        value={review}
        type="textarea"
        onChange={(e) => setReview(e.target.value)}
        placeholder="Review"
        label="Your review"
      />
      <div>
        <label>Rating</label>
        <div className={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredStar(i)}
              onMouseLeave={() => setHoveredStar(rating)}
              onClick={() => setRating(i)}
            >
              <EmptyStar
                className={
                  i <= hoveredStar && hoveredStar !== null
                    ? styles.hovered
                    : null
                }
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
