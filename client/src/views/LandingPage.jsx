import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

const LandingPage = () => {
    return (
      <div className="container">
      <div className="overlay"></div>
      <div className="contenedor">
        <h1 id="h1Bienvenida">¡Bienvenido a nuestra página PI HENRY PROYECT!</h1>
        <p id="pBienvenida">
        Estamos emocionados de ayudarte a encontrar a tu nuevo compañero peludo.
        </p>
        <Link to="/home" className="btnPrimary">
          ENTRAR
        </Link>
      </div>
    </div>
    )
  };
  
  export default LandingPage; 