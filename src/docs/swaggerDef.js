const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Cypher Ecommerce Store Api',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: config.swaggerUrl || `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
