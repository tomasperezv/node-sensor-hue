require('dotenv').config();

const http = require('http');
const taskRunner = require('./task/runner.js');

taskRunner();

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({}));
  res.end();
}).listen(process.env.PORT);
