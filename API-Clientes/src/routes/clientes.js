const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const validarCliente = require('../middlewares/validarCliente');

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       required:
 *         - nome
 *         - cpf
 *       properties:
 *         codigo:
 *           type: integer
 *           description: ID único do cliente
 *         nome:
 *           type: string
 *           description: Nome do cliente
 *         data_nascimento:
 *           type: string
 *           format: date
 *           description: Data de nascimento do cliente
 *         rg:
 *           type: string
 *           description: RG do cliente
 *         cpf:
 *           type: string
 *           description: CPF do cliente (único)
 *         telefone:
 *           type: string
 *           description: Telefone do cliente
 *         endereco:
 *           type: string
 *           description: Endereço do cliente
 *         numero:
 *           type: string
 *           description: Número do endereço
 *         cidade:
 *           type: string
 *           description: Cidade do cliente
 *         uf:
 *           type: string
 *           description: UF do cliente
 *         cep:
 *           type: string
 *           description: CEP do cliente
 */

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no servidor
 */
router.post('/clientes', validarCliente, clientesController.create);

/**
 * @swagger
 * /clientes/{codigo}:
 *   get:
 *     summary: Obtém um cliente pelo código
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente não encontrado
 */
router.get('/clientes/:codigo', clientesController.readOne);

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Filtrar por nome
 *       - in: query
 *         name: cidade
 *         schema:
 *           type: string
 *         description: Filtrar por cidade
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Página atual
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Itens por página
 *     responses:
 *       200:
 *         description: Lista de clientes
 *       500:
 *         description: Erro no servidor
 */
router.get('/clientes', clientesController.readAll);

/**
 * @swagger
 * /clientes/{codigo}:
 *   put:
 *     summary: Atualiza um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Cliente não encontrado
 */
router.put('/clientes/:codigo', validarCliente, clientesController.update);

/**
 * @swagger
 * /clientes/{codigo}:
 *   delete:
 *     summary: Remove um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código do cliente
 *     responses:
 *       204:
 *         description: Cliente removido com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
router.delete('/clientes/:codigo', clientesController.delete);

module.exports = router;