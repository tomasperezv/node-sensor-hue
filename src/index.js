require('dotenv').config();

const huejay = require('huejay');
const http = require('http');

const bridgeManager = require('./core/bridge.js');
const apiClient = require('./api/client.js');
const reporterFactory = require('./reporter/reporter-factory.js');

const JOB_ID = 'job5';

bridgeManager.get()
  .then((bridge) => {
    const client = new huejay.Client({ host: bridge.ip, username: process.env.HUE_USERNAME });

    client.sensors.getAll()
      .then((sensors) => {
        sensors.forEach((sensor) => {
          const reporter = reporterFactory.get(sensor);
          if (reporter !== null) {
            console.log(`${reporter.metricId} ${reporter.value}`); // eslint-disable-line
            if (!process.env.PUSHGATEWAY_DISABLED) {
              apiClient.send(JOB_ID, reporter.metricId, reporter.value);
            }
          }
        });
      });
  });

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({}));
  res.end();
}).listen(process.env.PORT);
