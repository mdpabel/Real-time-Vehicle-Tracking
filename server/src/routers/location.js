const express = require('express');
const { userCurrentLocation } = require('../controllers/location');

const router = express.Router();

router.route('/my-location').post(userCurrentLocation);

module.exports = router;
