require('dotenv').config();

const taskRunner = require('./task/runner.js');
const commandServer = require('./core/server.js');

taskRunner();
commandServer();
