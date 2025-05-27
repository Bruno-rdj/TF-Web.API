function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;
    
    return digitoVerificador1 === parseInt(cpf.charAt(9)) && 
           digitoVerificador2 === parseInt(cpf.charAt(10));
}

module.exports = (req, res, next) => {
    if (!req.body.nome) {
        return res.status(400).json({ erro: 'Nome é obrigatório' });
    }
    if (!req.body.cpf) {
        return res.status(400).json({ erro: 'CPF é obrigatório' });
    }
    if (!validarCPF(req.body.cpf)) {
        return res.status(400).json({ erro: 'CPF inválido' });
    }
    next();
};