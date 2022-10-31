const redisClient = require('../db/redis');

const userCurrentLocation = async (req, res) => {
  try {
    const { lat, lng, name } = req.body;

    console.log(lat, lng, name);

    if (lat && lng && name) {
      await redisClient.geoAdd('userLocation', {
        longitude: lng,
        latitude: lat,
        member: name,
      });

      res.status(201).json({ message: 'Success' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error.',
    });
  }
};

module.exports = { userCurrentLocation };
