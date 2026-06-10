const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

const lerBD = () => {
    try {
        return JSON.parse(fs.readFileSync('bd.json', 'utf8'));
    } catch {
        return [];
    }
};

const salvarBD = (dados) => {
    fs.writeFileSync('bd.json', JSON.stringify(dados, null, 2));
};

app.get('/clientes', (req, res) => {
    const clientes = lerBD();
    res.json(clientes);
});

app.get('/clientes/:cpf', (req, res) => {
    const clientes = lerBD();
    const cliente = clientes.find(c => c.cpf === req.params.cpf);
    
    if (!cliente) return res.status(404).json({ mensagem: "Cliente não encontrado" });
    
    res.json(cliente);
});

app.post('/clientes', (req, res) => {
    const novo = req.body;
    
    if (!novo.cpf || !novo.nome) {
        return res.status(400).json({ mensagem: "CPF e nome são obrigatórios" });
    }

    const clientes = lerBD();

    if (clientes.some(c => c.cpf === novo.cpf)) {
        return res.status(409).json({ mensagem: "CPF já cadastrado" });
    }

    clientes.push(novo);
    salvarBD(clientes);
    
    res.status(201).json({ mensagem: "Cliente cadastrado com sucesso" });
});

app.put('/clientes/:cpf', (req, res) => {
    const clientes = lerBD();
    const index = clientes.findIndex(c => c.cpf === req.params.cpf);

    if (index === -1) return res.status(404).json({ mensagem: "Cliente não encontrado" });

    clientes[index] = { ...clientes[index], ...req.body, cpf: req.params.cpf };
    salvarBD(clientes);

    res.json({ mensagem: "Cliente atualizado com sucesso" });
});

app.delete('/clientes/:cpf', (req, res) => {
    let clientes = lerBD();
    const index = clientes.findIndex(c => c.cpf === req.params.cpf);

    if (index === -1) return res.status(404).json({ mensagem: "Cliente não encontrado" });

    const removido = clientes.splice(index, 1);
    salvarBD(clientes);

    res.json({ mensagem: "Cliente removido com sucesso" });
});

app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});
