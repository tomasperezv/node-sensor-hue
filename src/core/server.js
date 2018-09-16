const http = require('http');
const apiClient = require('../api/client.js');
const Constant = require('./constants');

module.exports = () => {
  if (typeof process.env.PORT === 'undefined') {
    throw new Error('Missing PORT environment variable');
  }

  console.log(`Initializing the HTTP server, listening on ${process.env.PORT}`); // eslint-disable-line no-console

  const server = http.createServer((request, response) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', () => {
      console.log(body); // eslint-disable-line

      let result = {};
      try {
        result = JSON.parse(body);
      } catch (e) {
      }

      if (typeof result.metric === 'undefined' || typeof result.value === 'undefined') {
        console.log(`Invalid metric ${body}`); // eslint-disable-line no-console
        response.writeHead(400, {});
      } else {
        console.log(`Sending metric ${metric} ${value}`); // eslint-disable-line no-console

        const { metric, value } = result;
        apiClient.send(Constant.JOB_ID_EXTERNAL, metric, value);

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({}));
      }

      response.end();
    });
  }).listen(process.env.PORT, '0.0.0.0');

  server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  });
};
