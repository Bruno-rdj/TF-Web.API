# API de Gerenciamento de Clientes

API RESTful para gerenciamento de clientes desenvolvida com Node.js, Express e PostgreSQL, permitindo operações completas de CRUD (Create, Read, Update, Delete).

## Sobre o Projeto

Este projeto implementa uma API para gerenciamento de clientes, permitindo cadastrar, consultar, atualizar e excluir registros de clientes. A API foi desenvolvida seguindo boas práticas de desenvolvimento e arquitetura de software, com foco em modularidade, validação de dados e tratamento adequado de erros.

## Estrutura do Projeto

O projeto consiste nos seguintes componentes principais:

- **Controllers**: Responsáveis por receber as requisições HTTP, interagir com os models e retornar as respostas adequadas.
  - `clientesController.js`: Implementa as operações CRUD para clientes.

- **Models**: Definem a estrutura dos dados e interagem com o banco de dados.
  - `Cliente.js`: Define o modelo de dados para clientes com validações.

- **Routes**: Definem os endpoints da API e conectam as requisições aos controllers.
  - `clientes.js`: Define as rotas para operações com clientes.

- **Middlewares**: Implementam funcionalidades que são executadas entre a requisição e a resposta.
  - `validarCliente.js`: Valida os dados do cliente antes de processá-los.

- **Config**: Contém configurações do projeto.
  - `database.js`: Configuração de conexão com o banco de dados.

- **App e Server**: Inicializam e configuram o servidor Express.
  - `app.js`: Configura o Express, middlewares e rotas.
  - `index.js`: Inicializa o servidor HTTP.

## Requisitos

- Node.js (v14 ou superior)
- Docker e Docker Compose
- PostgreSQL

## Configuração e Execução

### Usando Docker Compose (Recomendado)

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/api-clientes.git
   cd api-clientes
   ```

2. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   
   O arquivo `.env` já está configurado para funcionar com o Docker Compose.

3. **Inicie os contêineres**
   ```bash
   docker-compose up -d
   ```
   
   Este comando irá:
   - Criar um contêiner PostgreSQL com o banco de dados
   - Criar um contêiner para a API
   - Configurar a rede entre os contêineres
   - Expor a API na porta 3000

4. **Acesse a API**
   - A API estará disponível em: http://localhost:3000/api
   - A documentação Swagger estará em: http://localhost:3000/api-docs

### Executando Localmente (Sem Docker)

1. **Clone o repositório e instale as dependências**
   ```bash
   git clone https://github.com/seu-usuario/api-clientes.git
   cd api-clientes
   npm install
   ```

2. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   
   Edite o arquivo `.env` para apontar para seu banco PostgreSQL local.

3. **Inicie a aplicação**
   ```bash
   npm run dev
   ```

## Endpoints da API

### Clientes

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

## Documentação da API

A documentação completa da API está disponível através do Swagger UI. Após iniciar a aplicação, acesse:

```
http://localhost:3000/api-docs
```

## Testes

Para executar os testes unitários:

```bash
npm test
```