"use client";
import { useEffect, useState } from "react";

import styles from "./ReviewForm.module.scss";

import Input from "@/components/input";
import InputButton from "@/components/input_button";
import EmptyStar from "@/icons/empty_star";
import Star from "@/icons/star";
import ToolTip from "@/components/info_tooltip";
const ReviewForm = () => {
  const [meal, setMeal] = useState(""); // Meal stripe prod id [optional]
  const [rating, setRating] = useState(null); // Rating of the review [1-5]
  const [name, setName] = useState(""); // Name of the reviewer
  const [review, setReview] = useState(""); // Review text
  const [hoveredStar, setHoveredStar] = useState(null); // Hovered star
  const [errors, seterrors] = useState({}); // Error messages
  const addReview = (e) => {
    e.preventDefault();
    // Validation
    if (name === "") {
      seterrors({ ...errors, name: "Name is required" });
      return;
    }
    if (review === "") {
      seterrors({ ...errors, review: "Review is required" });
      return;
    }
    if (rating === null) {
      seterrors({ ...errors, rating: "Rating is required" });
      return;
    }
    console.log(meal, rating, name, review);
  };
  const toolTiptext = () => {
    return <>This name will be set as your account name</>;
  };
  return (
    <form onSubmit={(e) => addReview(e)} className={styles.reviewFormContainer}>
      <div className={styles.smallInputsLayout}>
        <Input
          selectContent={["", "Breakfast", "Lunch", "Dinner"]}
          onChange={(e) => {}}
          select={[meal, setMeal]}
          placeholder="&#9660;"
          label="Meal you want to write review about (optional)"
        />
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            seterrors({ ...errors, name: "" });
          }}
          tooltip={<ToolTip text={toolTiptext()} />}
          placeholder="Name"
          label="Your name"
          error={errors.name}
        />
      </div>
      <Input
        value={review}
        type="textarea"
        onChange={(e) => {
          setReview(e.target.value);
          seterrors({ ...errors, review: "" });
        }}
        placeholder="Review"
        label="Your review"
        error={errors.review}
      />
      <div>
        <label className={errors.rating ? styles.errorLabel : null}>
          {errors.rating ? errors.rating : "Rating"}
        </label>
        <div
          className={`${styles.ratingContainer} ${
            errors.rating ? styles.errorRating : null
          }`}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              onMouseEnter={() => {
                setHoveredStar(i);
                seterrors({ ...errors, rating: "" });
              }}
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
      <InputButton buttonColor="orange" buttonStyle="fill" type="submit">
        Add review
      </InputButton>
    </form>
  );
};

export default ReviewForm;
