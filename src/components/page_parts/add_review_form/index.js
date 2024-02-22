"use client";
import { useContext, useEffect, useState } from "react";

import styles from "./ReviewForm.module.scss";

import { addDoc, collection, doc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

import { FirebaseAuthUser } from "@/context/firebase/auth/context";
import { auth, db } from "@/firebase/config";

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
  const [disbaleName, setDisbaleName] = useState(false); // Disable name input if user has display name
  const user = useContext(FirebaseAuthUser); // User context
  useEffect(() => {
    if (user.user && user.user.displayName) {
      setName(user.user.displayName);
      setDisbaleName(true);
    }
  }, [user]);
  updateProfile;
  const addReview = async (e) => {
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
    let reviewData;
    if (meal !== "") {
      reviewData = {
        meal: meal,
        rating: rating,
        name: name,
        review: review,
        date: new Date(),
      };
    } else {
      reviewData = {
        rating: rating,
        name: name,
        review: review,
        date: new Date(),
      };
    }
    // Add review to firestore
    try {
      const docRef = await addDoc(collection(db, "reviews"), { reviewData });
      console.log("ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const toolTiptext = () => {
    return (
      <>
        {disbaleName ? (
          <>This is name of your account which can't be edited here</>
        ) : (
          <>This name will be set as your account name</>
        )}
      </>
    );
  };
  return (
    <form onSubmit={(e) => addReview(e)} className={styles.reviewFormContainer}>
      <div className={styles.smallInputsLayout}>
        <div className={styles.layoutElements}>
          <Input
            selectContent={["", "Breakfast", "Lunch", "Dinner"]}
            onChange={(e) => {}}
            select={[meal, setMeal]}
            placeholder="&#9660;"
            label="Meal you want to write review about (optional)"
          />
        </div>
        <div className={styles.layoutElements}>
          <Input
            disable={disbaleName}
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
