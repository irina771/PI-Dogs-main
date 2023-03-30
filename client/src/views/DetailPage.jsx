import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../redux/actions/index";
import styles from "../styles/Detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const DogDeits = useSelector((state) => state.dogDetail);
  const { id } = useParams();
  // Tengo que crear una accion para que no me cargue por error otra imagen previamente
  useEffect(() => {
    dispatch(getDetail(id));
    }, [dispatch, id]);

    console.log("dogDeits", DogDeits);
  return (
    <div className={styles.detalleBackground}>
      <nav>
        <div className={styles.btnContainer}>
          <button className={styles.botones} style={{ marginBottom: '20px' }}>
            <Link className={styles.detalleBtn} to="/createDog">
              Crear Perritos
            </Link>
          </button>

          <button className={styles.botones} style={{ marginRight: '50px' }}>
            <Link className={styles.detalleBtn} to="/home">
              Regresar
            </Link>
          </button>
        </div>
      </nav>

      <div className={styles.imgCard}>
        {/* object keys te devuelve tremendo array que sirve porque numbers */}

        {Object.keys(DogDeits).length > 0 ? (
          <div className={styles.Detail}>
            <div>
              <h4 className={styles.detailName}>{DogDeits.name}</h4>
            </div>
            <div>
              <img
                className={styles.imagen}
                src={DogDeits.image}
                alt={DogDeits.name}
                width="200" height="150"
              />
            </div>
            <div>
              <div className={styles.stats}>
                <span>Id: {DogDeits.id}</span>
                <span>Nombre: {DogDeits.name}</span>
                <span>Peso: {DogDeits.weight}</span>
                <span>Altura: {DogDeits.height}</span>
                <span>Temperamentos: {DogDeits.temperament}</span>
                <span>Años de vida: {DogDeits.life_span}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className={styles.pCasi}>YA CASI</p>
        )}
      </div>
    </div>
  );
}