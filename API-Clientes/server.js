const express = require('express');
const sequelize = require('./src/config/database');
const clientesRoutes = require('./src/routes/clientes');

const app = express();
app.use(express.json());
app.use(clientesRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000 🚀'));
}).catch(error => {
    console.error('Erro ao conectar ao banco:', error);
});