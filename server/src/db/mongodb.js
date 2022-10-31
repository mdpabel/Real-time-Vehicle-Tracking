const mongoose = require('mongoose');
const { uri } = require('../../config');

mongoose
  .connect(uri)
  .then((res) => console.log('DB connection success'))
  .catch((err) => console.log('DB connection failed', err));
