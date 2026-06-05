import React from "react";
import styles from "../styles/cardComponent.css";

export default function Card({ name, image, temperament, weight }) {
  console.log(image);
  return (
    <div>
      <div className={styles`homeCard`}>
        <div className={styles`card-text`}>
          <div className={styles`letraTitulo`}>
            <h3>{name}</h3>
          </div>
          <div>
          <img src={image} alt="img" />
          </div>
          <div className={styles`letra`}>
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
