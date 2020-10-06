import React from "react";
import "../Styles/Promos.scss";
import peapodLogo from "../assets/peapod-logo-vector-1.png";
import roundysLogo from "../assets/roundys-logo-1.png";

export default function PromoCode({ event }) {
  return (
    <div className="promo-container">
      <img
        src={event.type === "promocode" ? peapodLogo : roundysLogo}
        alt="peapod logo"
      />
      <p className="promo-type">{event.type}</p>
      <p className="promo-title">{event.title}</p>
      <p className="promo-text">{event.text}</p>
    </div>
  );
}
