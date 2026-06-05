import { useDispatch } from "react-redux";
import { orderBy } from "../redux/actions/index";
import styles from "../styles/filters.module.css";

function Filter1({ setCurrentPage }) {
  const dispatch = useDispatch();

  const handleSort = (e) => {
    dispatch(orderBy(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className={styles.filterContainer}>
      <select
        className={styles.filter}
        onChange={handleSort}
      >
        <option value="ascendente">A-Z</option>
        <option value="descendente">Z-A</option>
        <option value="mayor">+ Peso</option>
        <option value="menor">- Peso</option>
      </select>
    </div>
  );
}
export default Filter1;
