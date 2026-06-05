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
        throw new Error("Dog not found");
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
    }catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
  }
});
//---------/:idRaza------------
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Si es un UUID, buscar en la BD
    if (id.includes("-")) {
      let dogDB = await Dog.findOne({
        where: { id },
        include: Temperament,
      });

      if (!dogDB) {
        return res.status(404).json({
          message: "Dog not found",
        });
      }

      dogDB = JSON.parse(JSON.stringify(dogDB));

      dogDB.temperaments = dogDB.temperaments
      .map((temp) => temp.name);

      return res.status(200).json(dogDB);
    }

    // Buscar en la API usando la lista completa
    const dogs = await dogsAPIinfo();
        const dog = dogs.find(
        (d) => String(d.id) === String(id)
      );

    if (!dog) {
      return res.status(404).json({
        message: "Dog not found",
      });
    }

    return res.status(200).json(dog);
  } catch (err) {
    console.error("Error getting dog:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
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
