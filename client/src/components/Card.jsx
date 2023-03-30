import React from "react";
import styles from "../styles/cardComponent.css";

export default function Card({ name, image, temperament, weight }) {
  return (
    <div>
      <div className={`homeCard`}>
        <div className={`card-text`}>
          <div className={`letraTitulo`}>
            <h3>{name}</h3>
          </div>
          <div>
          <img src={image} alt="img" />
          </div>
          <div className={`letra`}>
          <h4>Peso min y max: </h4>
          <p>{weight}</p>
          <h4>Temperamentos:</h4>
          <p> {temperament.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
