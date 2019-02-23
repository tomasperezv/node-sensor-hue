const fs = require('fs');
const http = require('http');
const parseString = require('xml2js').parseString;

/**
 * @type {Object} config
 */
const Config = {
  hostname: 'www.mambiente.munimadrid.es',
  path: '/opendata/horario.xml',

  /**
   * Stations that we want to gather information from
   * @see https://datos.madrid.es/FWProjects/egob/Catalogo/MedioAmbiente/Aire/Ficheros/Interprete_ficheros_%20calidad_%20del_%20aire_global_.pdf
   */
  Stations: [
    '28079039_6_48',
    '28079039_7_8',
    '28079039_8_8',
    '28079039_12_8',
    '28079039_14_6',
    '28079048_7_8',
    '28079048_8_8',
    '28079048_9_47',
    '28079048_10_47',
    '28079048_12_8',
  ],

  /**
   * List of magnitudes that we want to fetch
   * @see https://datos.madrid.es/FWProjects/egob/Catalogo/MedioAmbiente/Aire/Ficheros/Interprete_ficheros_%20calidad_%20del_%20aire_global_.pdf
   */
  Magnitudes: {
    1: [
      'Sulfur Dioxide',
      'sulfur_dioxide'
    ],
    6: [
      'Carbon Monoxide',
      'carbon_monoxide'
    ],
    7: [
      'Nitrogen Monoxide',
      'nitrogen_monoxide'
    ],
    8: [
      'Nitrogen Dioxide',
      'nitrogen_dioxide'
    ],
    9: [
      'Particles under 2.5',
      'particles_under_2'
    ],
    10: [
      'Particles under 10',
      'particles_under_10'
    ],
    12: [
      'Nitrogen Oxides',
      'nitrogen_oxides'
    ],
    14: [
      'Ozone',
      'ozone'
    ]
  }
};

/**
 * @param {Object} data
 */
const format = (data) => {
  const result = [];
  data.Datos.Dato_Horario.forEach(d => {
    if (Config.Stations.indexOf(d.punto_muestreo[0]) > -1) {
      let value = 0;
      for (let i = 1; i <= 24; i++) {
        const key = i < 10 ? '0' + i : i;
        if (d[`H${key}`][0] === '0') {
          break;
        } else if (d[`V${key}`][0] === 'V') {
          value = d[`H${key}`][0];
        }
      }

      const metric = {
        id: `${d.punto_muestreo}_${Config.Magnitudes[d.magnitud][1]}`,
        value
      };

      result.push(metric);
    }
  });

  return result;
};

module.exports = {
  get: () => {
    return new Promise((resolve) => {
      const options = {
        hostname: Config.hostname,
        path: Config.path,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          Host: 'www.mambiente.munimadrid.es'
        }
      };

      http.get(options, (res) => {
        let data = '';
        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', chunk => {
          parseString(data, (err, result) => {
            if (!err) {
              resolve(format(result));
            }
          });
        });
      });
    });
  }
};
