import { useDispatch } from "react-redux";
import { filterBy } from "../redux/actions";
import styles from "../styles/filters.module.css";

export default function Filter3() {
  const dispatch = useDispatch();

  function handleFilter(e) {
    e.preventDefault();
    dispatch(filterBy(e.target.value));
  }

  return (
    <div className={styles.filterContainer}>
      <div>
        <select   className={styles.filter} onChange={(e) => handleFilter(e)}>
          <option value="All">Api / Creados</option>
          <option value="api">api</option>
          <option value="Created">Created</option>
        </select>
      </div>
    </div>
  );
}
