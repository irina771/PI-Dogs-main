import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { filterTemperament, getTemperaments } from "../redux/actions";
import styles from "../styles/filters.module.css";

export default function Filter2() {
  const temperaments = useSelector((state) => state.temperaments);

  const dispatch = useDispatch();

  const temperamentsOrder = temperaments.sort((a, b) => {
    //se ordena alfabeticamente para que salga bien en el select
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function onFilterTemperament(e) {
    console.log("Filtering by temperament:", e.target.value);
    e.preventDefault();
    dispatch(filterTemperament(e.target.value));
  }

  return (
    <div className={styles.filterContainer}>
      <div>
        <select  className={styles.filter} onChange={onFilterTemperament}>
          <option value="All Temperaments" key="All Temperaments">
            Ordenar por Temperamentos
          </option>
          {temperamentsOrder.map((el, index) => (
            <option value={el.name} key={index}>
              {el.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
