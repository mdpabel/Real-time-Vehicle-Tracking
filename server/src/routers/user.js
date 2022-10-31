const express = require('express');
const { createUser, getUser } = require('../controllers/user');

const router = express.Router();

router.route('/user').post(createUser).get(getUser);

module.exports = router;
