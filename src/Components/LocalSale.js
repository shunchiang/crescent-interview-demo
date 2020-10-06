import React from "react";
import "../Styles/Promos.scss";

export default function LocalSale({ event }) {
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2915.8377148771715!2d-87.90633404917092!3d43.044845899470666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8805190f58e6347b%3A0xa719ba159ade1c8f!2s1123%20N%20Van%20Buren%20St%2C%20Milwaukee%2C%20WI%2053202!5e0!3m2!1sen!2sus!4v1601965046317!5m2!1sen!2sus"
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
