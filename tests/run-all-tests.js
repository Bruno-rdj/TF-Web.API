/**
 * Script para executar todos os testes em sequência
 */
const { exec } = require('child_process');
const path = require('path');

// Função para executar um comando e retornar uma promessa
function runCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(`\n\n========== Executando: ${command} ==========\n`);
    
    const process = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar o comando: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
}

// Função principal para executar todos os testes
async function runAllTests() {
  try {
    console.log('Iniciando execução de todos os testes...');
    
    // Executar teste de API básico
    await runCommand('node tests/test-api.js');
    
    // Executar teste de filtros
    await runCommand('node tests/test-filtros.js');
    
    // Executar teste de validações
    await runCommand('node tests/test-validacoes.js');
    
    console.log('\n\n========== Todos os testes foram executados com sucesso! ==========');
  } catch (error) {
    console.error('\n\n========== Erro durante a execução dos testes ==========');
    console.error(error);
    process.exit(1);
  }
}

// Executar todos os testes
runAllTests();