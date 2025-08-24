import React from "react";
import "./RecomCard.css";

const RecommendationCard = ({ name, reason, price, image, restaurant, onAddToCart }) => {
  return (
    <div className="reco-card">
      <div className="reco-card__media">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="reco-card__placeholder">{name?.[0] || "🍽"}</div>
        )}
      </div>
      <div className="reco-card__body">
        <div className="reco-card__row">
          <h3 className="reco-card__name">{name}</h3>
          {typeof price !== "undefined" && (
            <div className="reco-card__price">₹{price}</div>
          )}
        </div>
        {restaurant && <div className="reco-card__resto">{restaurant}</div>}
        {reason && <p className="reco-card__reason">{reason}</p>}
      </div>
      <div className="reco-card__actions">
        <button className="reco-card__btn" onClick={onAddToCart}>Add to cart</button>
      </div>
      <div className="rec">
        <p>Hello this is AiRecomm</p>
      </div>
    </div>
   

  );
};

export default RecommendationCard;
