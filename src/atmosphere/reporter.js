const Netatmo = require('netatmo');

const map = ['Temperature', 'CO2', 'Humidity', 'Pressure', 'Noise'];

const client = new Netatmo({
  client_id: process.env.NETATMO_CLIENT_ID,
  client_secret: process.env.NETATMO_CLIENT_SECRET,
  username: process.env.NETATMO_USERNAME,
  password: process.env.NETATMO_PASSWORD
});

client.getStationsData((err, devices) => {
  console.log(devices[0].modules); // eslint-disable-line no-console
});

const getPromiseForDevice = (moduleId, deviceId) => {
  const time = new Date();
  const minutes = time.getMinutes() > 29 ? time.getMinutes() - 30 : 0;
  time.setMinutes(minutes);

  return new Promise((resolve) => {
    let id = deviceId.split(':')[0];
    const options = {
      scale: 'max',
      date_begin: time.getTime(),
      scale: '5min',
      limit: 1,
      device_id: deviceId,
      type: map
    };

    if (moduleId !== deviceId) {
      options.module_id = moduleId;
      id = moduleId.split(':')[0];
    }

    client.getMeasure(options, (err, rawMeasure) => {
      if (!err) {
        const measureLength = rawMeasure.length;
        const lastMeasure = rawMeasure[measureLength - 1];
        const valueLength = lastMeasure.value.length;
        const data = lastMeasure.value[valueLength - 1].map((value, index) => {
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
