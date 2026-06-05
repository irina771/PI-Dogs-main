require('dotenv').config();

const { Router } = require('express');
const router = Router();

const axios = require('axios');

const { Temperament } = require('../db');

router.get('/', async (req, res) => {
    try {

        const temperamentsDb = await Temperament.findAll();

        if (temperamentsDb.length > 0) {
            return res.status(200).json(temperamentsDb);
        }

        const response = await axios.get(
            'https://api.thedogapi.com/v1/breeds',
            {
                headers: {
                    'x-api-key': process.env.DOG_API_KEY
            }
            }
        );

        const temperamentsData = response.data;

        const allTemperaments = [
            ...new Set(
                temperamentsData
                    .filter(dog => dog.temperament)
                    .flatMap(dog => dog.temperament.split(', '))
            )
        ];

        await Promise.all(
            allTemperaments.map(temp =>
                Temperament.findOrCreate({
                    where: { name: temp }
                })
            )
        );

        const result = await Temperament.findAll();

        return res.status(200).json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;