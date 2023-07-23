import React, { useState, useEffect } from "react";

//components
import ReviewCard from "../Reviews/ReviewCard";
import AddReviewCard from "../Reviews/AddReviewCard";
import { useParams } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getReview } from "../../redux/reducers/review/review.action";

const Reviews = () => {
  const [reviews, setReviews] = useState([
    // {
    //   rating: 5,
    //   isRestaurantReview: false,
    //   createdAt: "Fri Oct 14 2022 20:20:34 GMT+0530 (Indian Standard Time)",
    //   reviewText:
    //     "I have visited this place ambience was good staff is very nice and food was awesome...recommend this place to everyone 👍",
    // },
    // {
    //   rating: 5,
    //   isRestaurantReview: false,
    //   createdAt: "Fri Oct 14 2022 20:20:34 GMT+0530 (Indian Standard Time)",
    //   reviewText:
    //     "I have visited this place ambience was good staff is very nice and food was awesome...recommend this place to everyone 👍",
    // },
  ]);

  const { id } = useParams();
  const dispatch = useDispatch();

  const updatedReviews = useSelector(
    (globalState) => globalState.review.reviews.reviews
  );
  // console.log(updatedReviews);

  useEffect(() => {
    console.log("Getting reviews...");
    dispatch(getReview(id)).then((data) => {
      setReviews(data.payload.reviews);
    });
  }, []);

  useEffect(() => {
    console.log("updating your review!!!!!");
    if (updatedReviews) {
      setReviews(updatedReviews);
    }
  }, [updatedReviews]);

  return (
    <div className="w-full h-full flex-col md:flex md:flex-row relative gap-5">
      <div className="w-full md:w-8/12 flex flex-col gap-3">
        <div className="md:hidden mb-4 flex flex-col gap-2">
          <AddReviewCard />
        </div>
        {reviews.map((review, index) => (
          <ReviewCard {...review} key={index} />
        ))}
      </div>
      <aside
        style={{ height: "fit-content" }}
        className="hidden md:flex md:w-4/12 sticky rounded-xl top-20 bg-white py-4 px-4 shadow-md flex-col gap-4"
      >
        <AddReviewCard />
      </aside>
    </div>
  );
};

export default Reviews;
