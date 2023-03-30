import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../redux/actions";
import styles from "../styles/Create.module.css";
import { Link } from "react-router-dom";

const CreateDog = () => {
  const tempForm = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();
  const [create, setCreate] = useState(false);

  const initialState = {
    name: "",
    heightmin: "",
    heightmax: "",
    weightmin: "",
    weightmax: "",
    life_spanmin: "",
    life_spanmax: "",
    temperaments: [],
    image: "",
  };

  const [errors, setErrors] = useState({ form: "complete form" });
  const [completed, setCompleted] = useState(initialState);

  const finalForm = {
    name: completed.name,
    height: `${completed.heightmin} - ${completed.heightmax}`,
    weight: `${completed.weightmin} - ${completed.weightmax}`,
    life_span: `${completed.life_spanmin} - ${completed.life_spanmax} years`,
    temperament: completed.temperaments.map((item) => item.name),
    image: completed.image,
  };

  useEffect(() => {
    if (tempForm.length === 0) return dispatch(getTemperaments());
  }, [tempForm.length, dispatch]);


  //<-------------VALIDATE------------------------>
  const validate = (completed) => {
    let errors = {};
    if (!completed.name) {
      errors.name = "El nombre del perro es requerido";
    } 
     if (completed.name.length < 3) {
      errors.name = "El nombre del perro debe tener al menos 3 caracteres";
    }
    if (!completed.heightmin || !completed.heightmax) {
      errors.height = "La altura del perro es requerido";
    } 
    //verifica si heightmax es menor o igual que el valor de heightmin
     if (parseInt(completed.heightmax) <= parseInt(completed.heightmin)) {
      errors.height = "La altura-max debe ser más alto que la altura-min";
    }
    if (!completed.weightmin || !completed.weightmax) {
      errors.weight = "El peso del perro es requerido";
    } 
     if (parseInt(completed.weightmax) <= parseInt(completed.weightmin)) {
      errors.weight = "El peso-max debe ser más alto que el peso-min";
    }
    if (!completed.life_spanmin || !completed.life_spanmax) {
      errors.life_span = "Life span es requerido";
    } 
     if (parseInt(completed.life_spanmax) <= parseInt(completed.life_spanmin)) {
      errors.life_span = "Life span-max debe ser mas alto que el life span-min";
    }
    if (completed.temperaments.length === 0) {
      errors.temperaments = "Los temperamentos son requeridos";
    }
    if (completed.life_spanmax < 0 || completed.life_spanmin < 0) {
      errors.life_span = "El valor debe ser mayor que 0";
    }
    if (completed.weightmax < 0 || completed.weightmin < 0) {
      errors.weight = "El valor debe ser mayor que 0";
    }
    if (completed.heightmax < 0 || completed.heightmin < 0) {
      errors.height = "El valor debe ser mayor que 0";
    }

    return errors;
  };

  const handleChange = (e) => {
    setCompleted({ ...completed, [e.target.name]: e.target.value });
    setErrors(
      validate({
        ...completed,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleTemperaments = (e) => {
    if (
      !completed.temperaments.includes(
        tempForm.find((item) => item.name === e.target.value)
      )
    ) {
      completed.temperaments.push(
        tempForm.find((item) => item.name === e.target.value)
      );
    }
    setErrors(
      validate({
        ...completed,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    console.log(finalForm)
    e.preventDefault();
    const errors = validate(completed);
    setErrors(errors);
    if (Object.values(errors).length === 0) {
      axios.post("http://localhost:3001/dogs/createDog", finalForm);
      setCreate(!create);
      setCompleted(initialState);
    }
  };
  

  function handleDelete(name) {
    setCompleted({
      ...completed,
      temperaments: completed.temperaments.filter((item) => item.name !== name),
    });
  }

  return (
    <>
      <section className={styles.back}>
        <Link to="/home">
          <button className={styles.btnHome}>Home</button>
        </Link>
        {/* se pasa como prop create para cambiar el estado de crear un perro a perro creado con exito */}
        <div className={styles.FormContainer} create={create}>
          {!create ? ( 
            // si el estado create es falso dice crea sino perro creado
            <h2 className={styles.titulo}>CREA A TU PERRITO!</h2>
          ) : (
            
            <h2>DOG HAS BEEN CREATED SUCCESSFULLY</h2>
          )}
          <div className={styles.form} >
          <div className={styles.label}>Nombre de tu perrito:</div>
            <input
              type="text"
              name="name"
              autoComplete='off'
              value={completed.name}
              // actualiza el estado completed usando la funcion handleChange
              onChange={handleChange}
              
            />
            {errors.name ? <label>{errors.name}</label> : null}
            <br />
            <div className={styles.label}>Altura:</div>
            <input
              type="Number"
              name="heightmin"
              className="number"
              placeholder="Height-Min"
              value={completed.heightmin}
              onChange={handleChange}
              
            />
            <input
              type="Number"
              name="heightmax"
              className="number"
              placeholder="Height-Max"
              value={completed.heightmax}
              onChange={handleChange}
            />
            {errors.height ? <label>{errors.height}</label> : null} <br />
            <div className={styles.label}>Peso:</div>
            <input
              type="Number"
              name="weightmin"
              className="number"
              placeholder="Weight-Min"
              value={completed.weightmin}
              onChange={handleChange}
            />
            <input
              type="Number"
              name="weightmax"
              className="number"
              placeholder="Weight-Max"
              value={completed.weightmax}
              onChange={handleChange}
            />
            {errors.weight ? <label>{errors.weight}</label> : null} <br />
            <div className={styles.label}>Años de vida:</div>
            <input
              name="life_spanmin"
              value={completed.life_spanmin}
              placeholder="Life Span-Min"
              type="Number"
              className="number"
              onChange={handleChange}
            />
            <input
              name="life_spanmax"
              value={completed.life_spanmax}
              placeholder="Life Span-Max"
              type="Number"
              onChange={handleChange}
            />
            {errors.life_span ? <label>{errors.life_span}</label> : null} <br />
            <div className={styles.label}>Imagen (url):</div>
            <input
              name="image"
              value={completed.image}
              placeholder="Pon una URL"
              type="text"
              onChange={handleChange}
              autoComplete='off'
            />
            <br />
            <p>Temperamentos:</p>
            <select name="temperaments" onChange={handleTemperaments}>
              <option value="default">Elegir</option>
              {tempForm?.map((item) => (
                <option value={item.name} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>{" "}
            {errors.temperaments ? <label>{errors.temperaments}</label> : null}
            <div className={styles.button} create={create}>
              {!create ? (
             <button onClick={(e) => handleSubmit(e)} className={styles.crear} type="submit">Crear</button>
              ) : (
                <Link onClick={() => dispatch(getDogs())} to="/home">
                  REGRESA A HOME
                </Link>
              )}
            </div>
          </div>
          <div className={styles.temperaments}>
            {completed.temperaments?.map((item) => (
              <div key={item.id}>
                {item.name}{" "}
                <button onClick={() => handleDelete(item.name)}>x</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateDog;
