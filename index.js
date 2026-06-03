const { json } = require('body-parser');
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());

// ===================== ROTAS =====================

app.get('/ola', (req, res) => {
    res.send('Hello World!');
});

app.post('/cliente/cadastro', (req, res) => {
    const cliente = req.body;

    if (!cliente || Object.keys(cliente).length === 0) {
        return res.status(400).json({ 
            resposta: "body nao preenchido" 
        });
    }

    try {
        const bd = JSON.parse(fs.readFileSync('bd.json', 'utf-8'));
        
        bd.push(cliente);
        
        fs.writeFileSync('bd.json', JSON.stringify(bd, null, 2), 'utf8');
        
        res.status(200).json({ 
            resposta: "Cliente cadastrado com sucesso" 
        });
    } catch (error) {
        res.status(500).json({ 
            resposta: error.message 
        });
    }
});

app.get('/clientes', (req, res) => {
    try {
        const clientes = JSON.parse(fs.readFileSync('bd.json', 'utf8'));
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ 
            resposta: error.message 
        });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`API executando na porta ${port}`);
});
