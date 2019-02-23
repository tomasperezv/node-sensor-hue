const csv = require('csv-parser');
const fs = require('fs');

/**
 * @type {Object} config
 */
const Config = {
  URL: 'https://datos.madrid.es/egob/catalogo/212531-10515086-calidad-aire-tiempo-real.csv',

  /**
   * Stations that we want to gather information from
   * @see https://datos.madrid.es/FWProjects/egob/Catalogo/MedioAmbiente/Aire/Ficheros/Interprete_ficheros_%20calidad_%20del_%20aire_global_.pdf
   */
  Stations: [
    28079039,
    28079050,
    28079048
  ],

  /**
   * List of metrics that we want to fetch
   * @see https://datos.madrid.es/FWProjects/egob/Catalogo/MedioAmbiente/Aire/Ficheros/Interprete_ficheros_%20calidad_%20del_%20aire_global_.pdf
   */
  Metrics: {
    [
      '01',
      'Sulfur Dioxide',
      'sulfur_dioxide'
    ],
    [
      '06',
      'Carbon Monoxide',
      'carbon_monoxide'
    ],
    [
      '07',
      'Nitrogen Monoxide',
      'nitrogen_monoxide'
    ],
    [
      '08',
      'Nitrogen Dioxide',
      'nitrogen_dioxide'
    ],
    [
      '09',
      'Particles under 2.5',
      'particles_under_2'
    ],
    [
      '14',
      'Ozone',
      'ozone'
    ]
  }
};

/**
 * @param {Object} data
 */
const format = (data) => {
  console.log(data);
};

module.exports = {
  get: () => {
    return new Promise((resolve) => {
      const result = [];

      http.get(Config.URL, (res) => {
        res.pipe(
          fs.createReadStream('data.csv')
            .pipe(csv())
            .on('data', result.push)
            .on('end', () => {
              resolve(format(result));
            })
        );
      });
    });
  }
};
