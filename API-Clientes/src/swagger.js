const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Clientes',
      version: '1.0.0',
      description: 'API RESTful para gerenciamento de clientes',
    },
    servers: [
      {
        url: '/api',
        description: 'Servidor de desenvolvimento',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(specs),
};