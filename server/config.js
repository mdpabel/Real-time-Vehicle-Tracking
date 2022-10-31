const port = process.env.PORT;
const db = process.env.DBNAME;
const dbUser = process.env.DBUSER;
const dbPass = process.env.DBPASS;
const uri = `mongodb://${dbUser}:${dbPass}@cluster0-shard-00-00.hkgud.mongodb.net:27017,cluster0-shard-00-01.hkgud.mongodb.net:27017,cluster0-shard-00-02.hkgud.mongodb.net:27017/coutransportation?ssl=true&replicaSet=atlas-k8dxxy-shard-0&authSource=admin&retryWrites=true&w=majority`;
const redis_host = process.env.REDIS_HOST;
const redis_port = process.env.REDIS_PORT;
const redis_pass = process.env.REDIS_PASS;

module.exports = {
  port,
  uri,
  redis_host,
  redis_port,
  redis_pass,
};
