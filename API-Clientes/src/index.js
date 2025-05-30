const app = require('./app');

const PORT = process.env.PORT || 3000;

// Adiciona uma rota raiz para redirecionar para a documentação
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});