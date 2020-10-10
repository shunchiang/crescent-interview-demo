import React from "react";
import "../Styles/ingredients.scss";

export default function Ingredients({ ingredients }) {
  return (
    <div className="master">
      <div className="ing-container">
        <p className="ingredient-title">Ingredients</p>
        <div className="line"></div>
        <div className="ingredients">
          {ingredients.map((ing, i) => {
            return (
              <div className="row" key={i}>
                <p
                  className="ing-name"
                  data-testid={`ingrediant-${ing.name}`}
                >{`${ing.name}: `}</p>
                <p
                  className="ing-amoung"
                  data-testid={`ingrediant-amt${i}`}
                >{`${ing.amount ? ing.amount : "adjustable"} ${
                  ing.measurement
                }`}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
