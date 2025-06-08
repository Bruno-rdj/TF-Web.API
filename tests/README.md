# Scripts de Teste

Esta pasta contém scripts para testar a API de Clientes.

## Arquivos disponíveis

- `test-api.js` - Teste básico da API usando axios
- `test-filtros.js` - Teste de filtros e paginação
- `test-validacoes.js` - Teste de validações de dados
- `test-curl.bat` - Teste usando curl para Windows
- `test-api.sh` - Teste usando curl para Linux/Mac
- `run-all-tests.js` - Script para executar todos os testes em sequência

## Como executar

### Usando npm

```bash
# Executar todos os testes
npm test

# Executar testes específicos
npm run test:api
npm run test:filtros
npm run test:validacoes
```

### Executando diretamente

```bash
# Windows
node tests\test-api.js
tests\test-curl.bat

# Linux/Mac
node tests/test-api.js
chmod +x tests/test-api.sh
./tests/test-api.sh
```

## Observações

- Certifique-se de que a API esteja em execução antes de rodar os testes
- Os testes usam CPFs válidos para evitar erros de validação
- Os testes de filtro criam múltiplos clientes para testar a funcionalidade