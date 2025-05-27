const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
    codigo: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    nome: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O nome não pode estar vazio'
            }
        }
    },
    data_nascimento: { 
        type: DataTypes.DATE 
    },
    rg: { 
        type: DataTypes.STRING 
    },
    cpf: { 
        type: DataTypes.STRING, 
        unique: {
            msg: 'Este CPF já está cadastrado'
        },
        validate: {
            notEmpty: {
                msg: 'O CPF não pode estar vazio'
            }
        }
    },
    telefone: { 
        type: DataTypes.STRING 
    },
    endereco: { 
        type: DataTypes.STRING 
    },
    numero: { 
        type: DataTypes.STRING 
    },
    cidade: { 
        type: DataTypes.STRING 
    },
    uf: { 
        type: DataTypes.STRING(2) 
    },
    cep: { 
        type: DataTypes.STRING 
    }
}, {
    tableName: 'clientes',
    timestamps: false
});

module.exports = Cliente;