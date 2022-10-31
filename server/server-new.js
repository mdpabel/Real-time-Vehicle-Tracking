const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.get('/', (req, res) => {
  res.send('Desktop');
});

io.on('connection', (socket) => {
  console.log('connected');
  socket.on('gpsdata', (data) => {
    console.log(data);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
