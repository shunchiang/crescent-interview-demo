import React from "react";
import "../Styles/Promos.scss";

export default function EventPromo({ event }) {
  return (
    <div className="event-promo-card">
      <div className="event-content">
        <p className="event-title">{event.title}</p>
        <p className="event-type">Type: {event.type}</p>
        <p className="event-text">{event.text}</p>
      </div>
      <div className="event-location">
        <iframe
          title="map demo"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d578.3433096972391!2d-87.90834811026056!3d43.032269750257235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880519a4638d29d5%3A0xaee4e54f22b359ae!2s239%20E%20Chicago%20St%2C%20Milwaukee%2C%20WI%2053202!5e0!3m2!1sen!2sus!4v1601963755721!5m2!1sen!2sus"
          width="300"
          height="200"
          frameBorder="0"
          style={{ border: "0" }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </div>
    </div>
  );
}
