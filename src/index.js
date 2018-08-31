const huejay = require('huejay');
const bridgeManager = require('./bridge.js');

bridgeManager.get()
  .then((bridge) => {
    const client = new huejay.Client({ host: bridge.ip, username: process.env.HUE_USERNAME });

    client.sensors.getAll()
      .then((sensors) => {
        const map = {};
        sensors.forEach((sensor) => {
          if (typeof sensor.uniqueId === 'undefined') {
            return;
          }
          //console.log(JSON.stringify(sensor));

          if (typeof map[sensor.name] !== 'undefined') {
            map[sensor.name] = Object.assign(map[sensor.uniqueId], sensor);
          } else {
            map[sensor.name] = sensor;
          }
        });

        console.log(JSON.stringify(map['Office sensor'])); // eslint-disable-line
      });
  });
