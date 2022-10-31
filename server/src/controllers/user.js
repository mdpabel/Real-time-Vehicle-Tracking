const User = require('../models/user');

const createUser = async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = User(body);
    await newUser.save();
    res.status(201).send({
      message: 'Successfully created the user.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Something went wrong',
    });
  }
};

const getUser = async (req, res, next) => {
  try {
    res.send('user');
  } catch (error) {}
};

module.exports = { createUser, getUser };
