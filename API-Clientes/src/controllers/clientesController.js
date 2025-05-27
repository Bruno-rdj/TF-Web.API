const { Op } = require('sequelize');
const Cliente = require('../models/Cliente');

exports.create = async (req, res) => {
    try {
        const novoCliente = await Cliente.create(req.body);
        res.status(201).json(novoCliente);
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ erro: 'CPF já cadastrado' });
        }
        res.status(400).json({ erro: 'Erro ao cadastrar cliente', detalhes: error.message });
    }
};

exports.readOne = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.codigo);
        if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });
        res.json(cliente);
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        res.status(500).json({ erro: 'Erro no servidor' });
    }
};

exports.readAll = async (req, res) => {
    try {
        const { nome, cidade, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        
        // Construir filtros
        const where = {};
        if (nome) where.nome = { [Op.iLike]: `%${nome}%` };
        if (cidade) where.cidade = { [Op.iLike]: `%${cidade}%` };
        
        // Buscar clientes com paginação e filtros
        const { count, rows: clientes } = await Cliente.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['nome', 'ASC']]
        });
        
        // Calcular informações de paginação
        const totalPages = Math.ceil(count / limit);
        
        res.json({
            clientes,
            paginacao: {
                total: count,
                pagina_atual: parseInt(page),
                total_paginas: totalPages,
                por_pagina: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
        res.status(500).json({ erro: 'Erro ao listar clientes' });
    }
};

exports.update = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.codigo);
        if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });

        await cliente.update(req.body);
        res.json(cliente);
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ erro: 'CPF já cadastrado' });
        }
        res.status(400).json({ erro: 'Erro ao atualizar cliente', detalhes: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.codigo);
        if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });

        await cliente.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        res.status(500).json({ erro: 'Erro ao excluir cliente' });
    }
};