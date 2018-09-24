const Netatmo = require('netatmo');

const map = ['Temperature', 'CO2', 'Humidity', 'Pressure', 'Noise'];

const client = new Netatmo({
  client_id: process.env.NETATMO_CLIENT_ID,
  client_secret: process.env.NETATMO_CLIENT_SECRET,
  username: process.env.NETATMO_USERNAME,
  password: process.env.NETATMO_PASSWORD
});

const getPromiseForDevice = (moduleId, deviceId) => {
  return new Promise((resolve) => {
    let id = deviceId.split(':')[0];
    const options = {
      scale: 'max',
      device_id: deviceId,
      type: map
    };

    if (moduleId !== deviceId) {
      options.module_id = moduleId;
      id = moduleId.split(':')[0];
    }

    client.getMeasure(options, (err, measure) => {
      if (!err) {
        const data = measure[measure.length - 1].value[0].map((value, index) => {
          return {
            name: map[index],
            value
          };
        });

        resolve({ id: `netatmo${id}`, data });
      }
    });
  });
};

module.exports = {
  get: () => {
    const clients = process.env.NETATMO_MODULE_IDS.split(',');
    const id = clients[0];
    return Promise.all(clients.map(moduleId => getPromiseForDevice(moduleId, id)));
  }
};
