import { useDispatch } from "react-redux";
import { orderBy } from "../redux/actions/index";
import { useState } from "react";
import styles from "../styles/filters.module.css";

function Filter1({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [state, setState] = useState("");

  const handleSort = (e) => {
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    setState(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className={styles.filterContainer}>
      <div >
        <select className={styles.filter} onChange={(e) => handleSort(e)}>
          <option value="ascendente">A-Z</option>
          <option value="descendente">Z-A</option>
          <option value="mayor">+ Peso</option>
          <option value="menor">- Peso</option>
        </select>
      </div>
    </div>
  );
}
export default Filter1;
