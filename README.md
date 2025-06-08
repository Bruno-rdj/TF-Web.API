# API de Gerenciamento de Clientes

API RESTful para gerenciamento de clientes desenvolvida com Node.js, Express e PostgreSQL, permitindo operações completas de CRUD (Create, Read, Update, Delete).

## Sobre o Projeto

Este projeto implementa uma API para gerenciamento de clientes, permitindo cadastrar, consultar, atualizar e excluir registros de clientes. A API foi desenvolvida seguindo boas práticas de desenvolvimento e arquitetura de software, com foco em modularidade, validação de dados e tratamento adequado de erros.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
TF-Web.API/
├── API-Clientes/           # Código principal da API
│   ├── src/                # Código fonte
│   │   ├── config/         # Configurações
│   │   ├── controllers/    # Controladores
│   │   ├── middlewares/    # Middlewares
│   │   ├── models/         # Modelos
│   │   ├── routes/         # Rotas
│   │   ├── app.js          # Configuração do Express
│   │   ├── index.js        # Ponto de entrada
│   │   └── swagger.js      # Configuração do Swagger
│   ├── .env.example        # Exemplo de variáveis de ambiente
│   ├── Dockerfile          # Configuração do Docker
│   └── package.json        # Dependências da API
├── tests/                  # Scripts de teste
│   ├── test-api.js         # Teste básico da API
│   ├── test-filtros.js     # Teste de filtros
│   ├── test-validacoes.js  # Teste de validações
│   ├── test-curl.bat       # Teste via curl (Windows)
│   ├── test-api.sh         # Teste via curl (Linux/Mac)
│   └── run-all-tests.js    # Script para executar todos os testes
├── docker-compose.yml      # Configuração do Docker Compose
├── init.sql                # Script de inicialização do banco
├── package.json            # Dependências do projeto
└── README.md               # Documentação
```

## Pré-requisitos

- Node.js (v14 ou superior)
- PostgreSQL
- npm ou yarn
- Docker e Docker Compose (opcional, para execução containerizada)

## Configuração e Execução

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/TF-Web.API.git
cd TF-Web.API
```

### 2. Configurar o Banco de Dados (Execução Local)

1. Crie um banco de dados no PostgreSQL:
   ```sql
   CREATE DATABASE clientes_api;
   ```

2. Execute o script DDL para criar a tabela de clientes:
   ```sql
   CREATE TABLE clientes (
       codigo SERIAL PRIMARY KEY,
       nome VARCHAR(255) NOT NULL,
       data_nascimento DATE,
       rg VARCHAR(20),
       cpf VARCHAR(14) UNIQUE,
       telefone VARCHAR(20),
       endereco VARCHAR(255),
       numero VARCHAR(10),
       cidade VARCHAR(100),
       uf CHAR(2),
       cep VARCHAR(9)
   );
   ```

### 3. Configurar o Arquivo .env (Execução Local)

```bash
cp API-Clientes/.env.example API-Clientes/.env
```

Edite o arquivo `.env` com as configurações do seu banco de dados:
```
PORT=3000
DB_NAME=clientes_api
DB_USER=postgres
DB_PASS=postgres
DB_HOST=localhost
```

### 4. Iniciar a API

#### Opção 1: Usando Node.js (Execução Local)

```bash
# Instalar dependências
npm install

# Iniciar a API
npm start
```

Ou em modo de desenvolvimento:
```bash
npm run dev
```

#### Opção 2: Usando Docker Compose (Recomendado)

```bash
docker-compose up -d
```

Este comando irá:
- Criar um contêiner PostgreSQL com o banco de dados
- Criar automaticamente a tabela de clientes usando o script init.sql
- Criar um contêiner para a API
- Configurar a rede entre os contêineres
- Expor a API na porta 3000

Não é necessário configurar manualmente o banco de dados ou o arquivo .env quando usar Docker Compose, pois todas as configurações já estão definidas no arquivo docker-compose.yml.

## Endpoints da API

- `GET /api/clientes` - Listar todos os clientes
  - Parâmetros de consulta:
    - `nome`: Filtrar por nome (opcional)
    - `cidade`: Filtrar por cidade (opcional)
    - `page`: Número da página (padrão: 1)
    - `limit`: Itens por página (padrão: 10)

- `GET /api/clientes/:codigo` - Obter um cliente específico
- `POST /api/clientes` - Criar um novo cliente
- `PUT /api/clientes/:codigo` - Atualizar um cliente
- `DELETE /api/clientes/:codigo` - Excluir um cliente
- `GET /health` - Verificar o status da API

### Exemplo de payload para criar/atualizar cliente

```json
{
  "nome": "Nome do Cliente",
  "cpf": "123.456.789-00",
  "data_nascimento": "1990-01-01",
  "rg": "1234567",
  "telefone": "(11) 99999-9999",
  "endereco": "Rua Exemplo",
  "numero": "123",
  "cidade": "São Paulo",
  "uf": "SP",
  "cep": "01234-567"
}
```

## Testando a API

### Usando o Swagger UI

A documentação completa da API está disponível através do Swagger UI:
```
http://localhost:3000/api-docs
```

### Usando Scripts de Teste

1. **Scripts Node.js**:
   ```bash
   # Executar todos os testes
   npm test
   
   # Executar teste específico
   npm run test:api
   npm run test:filtros
   npm run test:validacoes
   ```

2. **Script Batch (Windows)**:
   ```bash
   tests\test-curl.bat
   ```

3. **Script Shell (Linux/Mac)**:
   ```bash
   chmod +x tests/test-api.sh
   ./tests/test-api.sh
   ```

### Usando Postman ou Insomnia

Importe o arquivo `postman_collection.json` para testar todos os endpoints.

## Solução de Problemas

1. **Erro de conexão com o banco de dados**:
   - Verifique se o PostgreSQL está em execução
   - Verifique as credenciais no arquivo `.env`
   - Verifique se o banco de dados foi criado

2. **Erro ao iniciar a aplicação**:
   - Verifique se todas as dependências foram instaladas
   - Verifique se o arquivo `.env` está configurado corretamente

3. **Erro nas requisições**:
   - Verifique se a API está em execução
   - Verifique se a URL está correta
   - Verifique o formato do JSON nas requisições POST e PUT

4. **Problemas com Docker**:
   - Verifique se o Docker e Docker Compose estão instalados e em execução
   - Use `docker-compose logs` para verificar erros nos containers
   - Certifique-se de que as portas 3000 e 5432 não estão sendo usadas por outros serviços