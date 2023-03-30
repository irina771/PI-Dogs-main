import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByName } from "../redux/actions/index";
import { useHistory } from "react-router-dom";
import styles from '../styles/SearchBar.module.css'

export default function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [dogData, setDogData] = useState(null);

  function handleInputChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name) {
      dispatch(getByName(name));
      setName("");
    }
  }

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSubmit}>
        <input
         
          type="text"
          placeholder="Busca Perritos"
          value={name}
          onChange={handleInputChange}
        />
        <button  type="submit">🔍</button>
      </form>
      {dogData !== null && dogData.id && history.push(`/dogs/:${dogData.id}`)}
    </div>
  );
}
