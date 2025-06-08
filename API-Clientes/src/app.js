const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar conexão com o banco
const sequelize = require('./config/database');

// Importar rotas
const clientesRoutes = require('./routes/clientes');

// Importar Swagger
const swagger = require('./swagger');

// Importar middleware de tratamento de erros
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swagger.serve, swagger.setup);

// Rotas
app.use('/api', clientesRoutes);

// Rota de verificação de saúde
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'API está funcionando corretamente' });
});

// Middleware para rotas não encontradas
app.use((req, res, next) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// Tratamento de erros
app.use(errorHandler);

// Sincronizar modelos com o banco de dados
sequelize.sync()
    .then(() => {
        console.log('Modelos sincronizados com o banco de dados');
    })
    .catch(error => {
        console.error('Erro ao sincronizar modelos:', error);
    });

module.exports = app;