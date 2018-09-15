const requestInterface = require('http');

module.exports = {
  send: (job, metric, value) => {
    const data = `# TYPE real_metric untyped
${metric}{label="val1"} ${value}
    `;

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
