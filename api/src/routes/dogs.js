const axios = require("axios");

const { Router } = require("express");
const router = Router();
const {
  dogsDBinfo,
  dogsTOTALinfo,
  dogsAPIinfo,
} = require("../services/index.js");
const { Dog, Temperament } = require("../db");

router.get("/", async (req, res) => {
  //-------SI ENTRO POR QUERY----------
  if (req.query.name) {
    try {
      let { name } = req.query;
      const dogs = await dogsTOTALinfo();
      const result = dogs.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );

      if (result.length >= 1) {
        res.status(200).json(result);
      } else {
        throw new Error(error);
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
  //------------SI NO ENTRO POR QUERY DEVUELVO TODOS---------
  else {
    try {
      let total = await dogsTOTALinfo();
      res.status(200).json(total);
    } catch (error) {
      res.status(400).json("error en buscar al perro por raza");
    }
  }
});
//---------/:idRaza------------
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (id.includes("-")) {
    try {
      let dogDB = await Dog.findOne({
        where: {
          id: id,
        },
        include: Temperament,
      });
      dogDB = JSON.stringify(dogDB);
      dogDB = JSON.parse(dogDB);

      dogDB.temperaments = dogDB.temperaments.map((d) => d.name + ", ");
      res.json(dogDB);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error al obtener la raza de la base de datos" });
    }
  } else {
    try {
      const response = await axios.get(
        `https://api.thedogapi.com/v1/breeds/${id}`
      );

      let {
        id: apiId, // Renombramos la variable id recibida de la API
        name,
        weight,
        height,
        life_span,
        temperament,
        reference_image_id,
      } = response.data;

      return res.json({
        id,
        name,
        weight: weight.metric,
        height: height.metric,
        life_span,
        temperament: temperament,
        image: `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`,
      });
    } catch (err) {
      console.error(err); // Agregar esta línea para imprimir el error real en la consola
      res.sendStatus(500);
      throw new Error(`Error al obtener la raza de la API: ${err.message}`);
    }
  }
});

//-------------------POST------------------------
router.post("/createDog", async (req, res) => {
  // try{
  let { name, height, weight, life_span, temperament, image } = req.body;
  
  const dogChecked = await Dog.findOne({
    where: { name: name },
  });
  if (dogChecked) {
    return res.status(404).send("The dog already exist");
  } else {
    let DogCreated = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image,
    });
console.log(temperament)
    let tempDeDB = await Temperament.findAll({
      where: { name: temperament },
    });
    DogCreated.addTemperament(tempDeDB);
    return res.status(200).send("The dog was created");
  }
});

module.exports = router;
