
const { Router } = require('express');
const router = Router();

const dogs = require('./dogs.js')
const temperaments = require('./temperaments.js')

router.use('/dogs', dogs)
router.use('/temperaments', temperaments)

module.exports = router;
