const requestInterface = require('http');

const labelValues = (labels) => {
  let result = '{';
  labels.forEach((label, index) => {
    if (index > 0) {
      result += ',';
    }

    result += `${label[0]}="${label[1]}"`;
  });

  result += '}';

  return result;
};

module.exports = {
  send: (job, metric, value, labels = [['label', 'val1']]) => {
    const data = `# TYPE real_metric untyped
${metric}{${labelValues(labels)}} ${value}
    `;

    console.log(data);

    const options = {
      host: process.env.PUSHGATEWAY_HOST,
      port: 9091,
      path: `/metrics/job/${job}/`,
      method: 'POST',
      headers: {
        'Content-Length': data.length,
        'Content-Type': 'text'
      }
    };

    const req = requestInterface.request(options, (response) => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        body += chunk;
      });

      response.on('end', () => {
        console.log(body); // eslint-disable-line
      });
    });

    req.write(data);
    req.end();
  }
};
