const { GeoReplyWith } = require('redis');
const redisClient = require('./src/db/redis');

function socketServer(io) {
  return io.on('connection', (socket) => {
    //
    console.log('socket connected');

    /**
     * User Location
     */

    socket.on('userlocation', async (data) => {
      const user = JSON.parse(data);

      if (user && user.longitude && user.latitude && user.member) {
        const a = await redisClient.geoAdd('users', {
          longitude: user?.longitude,
          latitude: user?.latitude,
          member: user?.member,
        });
      }
    });

    /**
     * Car Location
     */

    socket.on('gpsdata', async (data) => {
      // const gpsData = JSON.parse(data);

      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      await redisClient.geoAdd('coords', {
        longitude: data.lng,
        latitude: data.lat,
        member: data.busId,
      });

      const res = await redisClient.geoSearchWith(
        'coords',
        { latitude: 23.44973834391706902, longitude: 91.17642492055892944 },
        { radius: 53, unit: 'km' },
        [GeoReplyWith.COORDINATES]
      );

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
