const { getCountries, getEmissions } = require('../controllers/co2_emission.controller');
const router = require('express').Router();

router.get('/countries', getCountries)

router.get('/country/:id', getEmissions)


module.exports = router;