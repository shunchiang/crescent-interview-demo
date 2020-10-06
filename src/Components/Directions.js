import React from "react";
import "../Styles/directions.scss";

export default function Directions({ directions }) {
  return (
    <div className="directions-container">
      <p className="directions-title">Directions</p>
      {directions.map((step, i) => {
        return (
          <div className="row" key={i}>
            <p className="step-number">{i + 1 + "."}</p>
            <p className="step">{step.instructions}</p>
            {step.optional && <p className="optional">Optional</p>}
          </div>
        );
      })}
    </div>
  );
}
