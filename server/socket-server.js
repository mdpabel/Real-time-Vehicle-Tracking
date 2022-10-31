const redisClient = require('./src/db/redis');

function socketServer(io) {
  return io.on('connection', (socket) => {
    socket.on('userlocation', async (data) => {
      const user = JSON.parse(data);

      if (user && user.longitude && user.latitude && user.member) {
        const a = await redisClient.geoAdd('users', {
          longitude: user?.longitude,
          latitude: user?.latitude,
          member: user?.member,
        });

        console.log(a);
      }
    });

    socket.on('gpsdata', async (data) => {
      const gpsData = JSON.parse(data);

      await redisClient.geoAdd('cars', {
        longitude: gpsData.lng,
        latitude: gpsData.lat,
        member: gpsData.busId,
      });

      const availableCars = await redisClient.zRange('cars', 0, -1);

      let buses = [];

      for (let i = 0; i < availableCars.length; i++) {
        const key = {};
        const res = await redisClient.geoPos('cars', name);
        var keys = ['mine', 'yours'];
        redisClient.zunionstore(
          ['result', keys.length].concat(keys),
          function (err, res) {
            //
          }
        );
      }

      socket.broadcast.emit('carLocation', res);
    });
  });
}

function socketDebugger(io) {
  return io.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
}

module.exports = { socketServer, socketDebugger };
