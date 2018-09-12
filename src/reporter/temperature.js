const formatter = require('./formatId.js');
const JOB_ID = 'job5';

const sensor = function(sensor) {
  this.jobId = JOB_ID;
  this.metricId = formatter.parse(sensor.name);
  this.value = sensor.state.attributes.attributes.temperature / 100;
};

module.exports = sensor;
