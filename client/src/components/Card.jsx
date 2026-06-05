import React from "react";
import styles from "../styles/cardComponent.css";

export default function Card({ name, image, temperaments, weight }) {
  console.log(image);
  return (
    <div className={`homeCard`}>
      <div className={`card-text`}>
        <div className={`letraTitulo`}>
          <h3>{name}</h3>
        </div>
        <div>
          <img
            src={image || "https://placedog.net/500/280"}
            alt={name}
            onError={(e) => {
              e.target.src = "https://placedog.net/500/280";
            }}
          />
        </div>
        <div className={`letra`}>
          <h4>Peso min y max:</h4>
          <p>{weight} kg</p>
          <h4>Temperamentos:</h4>
          <p>{temperaments?.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}
