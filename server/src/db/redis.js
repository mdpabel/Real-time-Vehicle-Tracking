const redis = require('redis');
const { redis_pass, redis_host, redis_port } = require('../../config');

const redisClient = redis.createClient({
  socket: {
    host: redis_host,
    port: redis_port || 19380,
  },
  password: redis_pass,
});

(async () => {
  await redisClient.connect();
})();

redisClient.on('error', (err) => {
  console.error('redisClient Error', err);
});

redisClient.on('connect', () => {
  console.log('redis connected');
});

module.exports = redisClient;
