import React, { useState } from "react";
import Star from "./Star";
import './index.css'

const StarRating = ({
  maxRating = 5,
  color = "black",
  size = 20,
  showRating = true,
  setCustomRatingState = false,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="star-container">
      <div className="stars">
        {Array.from({ length: maxRating }, (_, i) => {
          return (
            <Star
              key={i}
              size={size}
              full={hoverRating ? hoverRating >= i + 1 : rating >= i + 1}
              onRate={() => {
                setRating(i + 1);
                setCustomRatingState ? setCustomRatingState(i + 1) : null;
              }}
              color={color}
              onHoverIn={() => {
                setHoverRating(i + 1);
              }}
              onHoverOut={() => {
                setHoverRating(0);
              }}
            />
          );
        })}
      </div>
      {showRating ? rating : ""}
    </div>
  );
};

export default StarRating;
