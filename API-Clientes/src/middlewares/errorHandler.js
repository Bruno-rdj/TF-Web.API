/**
 * Middleware para tratamento centralizado de erros
 */
const errorHandler = (err, req, res, next) => {
  console.error(`Erro: ${err.message}`);
  console.error(err.stack);

  // Erros específicos do Sequelize
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      erro: 'Erro de validação',
      detalhes: err.errors.map(e => e.message)
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      erro: 'Dados duplicados',
      detalhes: 'Um registro com estes dados já existe'
    });
  }

  if (err.name === 'SequelizeDatabaseError') {
    return res.status(500).json({
      erro: 'Erro de banco de dados',
      detalhes: process.env.NODE_ENV === 'production' ? 'Erro interno' : err.message
    });
  }

  // Erro padrão
  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : 'Erro interno do servidor';

  res.status(statusCode).json({
    erro: message
  });
};

module.exports = errorHandler;