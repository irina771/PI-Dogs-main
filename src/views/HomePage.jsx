import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments, clean } from "../redux/actions/index";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import Filter2 from "../components/Filter2";
import Filter1 from "../components/Filter1";
import Filter3 from "../components/Filter3";
import styles from "../styles/Home.module.css";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  const dispatch = useDispatch();

  //para manipular los states
  const allDog = useSelector((state) => state.dogs);

  // Creamos un state con la pagina actual y otro que haga set
  const [currentPage, setCurrentPage] = useState(1);
  const [DogPerPage, setDogPerPage] = useState(8); //asi mostramos 8 por pagina
  const indexLastDog = currentPage * DogPerPage;
  const indexFirstDog = indexLastDog - DogPerPage;
  //para marcar la distancia el slice parte a la mitad.
  const currentDog = allDog.slice(indexFirstDog, indexLastDog);
  //para setear la pagina en ese numero de pagina. Helps with rendering
  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleClick(e) {
    e.preventDefault(); // para que no se rompa. Just in case.
    dispatch(getDogs());
    setCurrentPage(1);
  }
  // se va a ejecutar cada vez que ocurra dispatch como en el did mount >// vacio no depende de nada
  useEffect(() => {
    console.log("Fetching dogs...");
    dispatch(getDogs());
    console.log("Fetching temperaments...");
    dispatch(getTemperaments());
    console.log("Cleaning state...");
    dispatch(clean());
  }, [dispatch]);

  

  return (
    <div className={styles.background}>
      <nav className={styles.nav}>
        <div>
          <SearchBar setCurrentPage={setCurrentPage}/>
          <Link to="/createDog">
            <button className={styles.btn}>Crear Perrito</button>
          </Link>
           <button 
          onClick={(e) => {
            handleClick(e);
          }}
          className={`${styles.btn} ${styles.recarga}`}
        >
          Home
        </button>
        </div>
        <div>
          <Filter2 setCurrentPage={setCurrentPage} />
          <Filter1 setCurrentPage={setCurrentPage} />
          <Filter3 setCurrentPage={setCurrentPage} />
        </div>
      </nav>

      {/* cambiamos a current */}
      <div className={`${styles.card} ${styles.cardContainer}`}>
        {/* cambiamos al current para que aparezcan los que quiero */}
        {currentDog.length === 0 ? (
          <img className={styles.image} alt="No hay perritos"></img>
        ) : (
          currentDog.map((c) => {
            return (
              <div className={styles.cardFormat} key={c.id}>
                <Link className={styles.name} to={"/dogs/" + c.id}>
                  <Card
                    name={c.name}
                    image={c.image}
                    weight={c.weight}
                    temperament={c.temperaments}
                  />
                </Link>
              </div>
            );
          })
        )}
      </div>
        <div className={styles.paginationContainer}>
      <div className={styles.pagination}>
        <Pagination
          DogPerPage={DogPerPage}
          allDog={allDog.length}
          paging={paging}
        />
      </div>
      </div>
    </div>
  );
};

export default HomePage;
