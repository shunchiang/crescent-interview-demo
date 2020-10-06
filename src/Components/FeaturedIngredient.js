import React from "react";
import EventPromo from "./EventPromo";
import LocalSale from "./LocalSale";
import PromoCode from "./PromoCode";
import "../Styles/Promos.scss";

export default function FeaturedIngredient({ featured }) {
  return (
    <div className="promo-master-container">
      <div className="promo-section">
        <p className="event-announcement">
          <span className="green">Events</span> <span className="and">&</span>{" "}
          <span className="green">Promos Near you</span>
        </p>
        {featured.length > 0 &&
          featured.map((ing, i) => {
            return (
              <div key={i}>
                {ing.type === "event" ? (
                  <EventPromo event={ing} />
                ) : ing.type === "local" ? (
                  <LocalSale event={ing} />
                ) : ing.type === "promocode" ? (
                  <PromoCode event={ing} />
                ) : null}
              </div>
            );
          })}
      </div>
    </div>
  );
}
