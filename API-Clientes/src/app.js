const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar conexão com o banco
const sequelize = require('./config/database');

// Importar rotas
const clientesRoutes = require('./routes/clientes');

// Importar Swagger
const swagger = require('./swagger');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swagger.serve, swagger.setup);

// Rotas
app.use('/api', clientesRoutes);

// Tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ erro: 'Erro interno do servidor' });
});

// Sincronizar modelos com o banco de dados
sequelize.sync()
    .then(() => {
        console.log('Modelos sincronizados com o banco de dados');
    })
    .catch(error => {
        console.error('Erro ao sincronizar modelos:', error);
    });

module.exports = app;