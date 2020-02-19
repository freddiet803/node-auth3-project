const express = require('express');
const server = express();
const cors = require('cors');
const userRouter = require('./data/users/user-router.js');

server.use(express.json());
server.use(cors());
server.use('/users', userRouter);

server.get('/', (req, res) => {
  res.send('api up and running');
});

module.exports = server;
