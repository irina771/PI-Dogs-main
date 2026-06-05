import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../redux/actions/index";
import styles from "../styles/Detail.module.css";
import styles2 from "../styles/Home.module.css";

export default function DetailPage() {
  const dispatch = useDispatch();
  const { dogDetail, loading, error } = useSelector(state => state);
  const { id } = useParams();

  // Tengo que crear una accion para que no me cargue por error otra imagen previamente
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  if (loading) {
  return (
    <div className={styles2.loadingContainer}>
      <span className={styles2.loader}></span>
    </div>
  );
}

if (error) {
  return (
    <div className={styles.detalleBackground}>
      <h2>Error al cargar el perro</h2>
      <p>{error}</p>
    </div>
  );
}
  return (
    <div className={styles.detalleBackground}>
      <nav>
        <div className={styles.btnContainer}>
          <button className={styles.botones}>
            <Link className={styles.detalleBtn} to="/createDog">
              Crear Perritos
            </Link>
          </button>

          <button className={styles.botones} >
            <Link className={styles.detalleBtn} to="/home">
              Regresar
            </Link>
          </button>
        </div>
      </nav>

      <div className={styles.imgCard}>

        {Object.keys(dogDetail).length > 0 ? (
          <div className={styles.Detail}>
            <div>
              <h4 className={styles.detailName}>{dogDetail.name}</h4>
            </div>
            <div>
              <img
                className={styles.imagen}
                src={dogDetail.image}
                alt={dogDetail.name}
                width="200"
                height="150"
              />
            </div>
            <div>
              <div className={styles.stats}>
                <span>Id: {dogDetail.id}</span>
                <span>Raza: {dogDetail.name}</span>
                <span>Peso: {dogDetail.weight}</span>
                <span>Altura: {dogDetail.height}</span>
                {dogDetail.createdInDb ? (
                  <span>
                    Temperamento: {dogDetail.temperament.join(", ")}
                  </span>
                ) : (
                  <span>
                    Temperamento: {dogDetail.temperaments.join(", ")}
                  </span>
                )}
                <span>Años de vida: {dogDetail.life_span} años</span>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles2.loadingContainer}>
            <span className={styles2.loader}></span>
          </div>
        )}
      </div>
    </div>
  );
}
