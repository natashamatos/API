const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
const fs = require('fs')

// Código 27/05/2026: rota de cadastro de cliente
app.post("/clientes/cadastro", (req,res) => {
    const cliente = req.body
    if (!cliente || Object.keys(cliente).length === 0) {
        res.status(400).json({resposta: "Body não preenchido"})
    } else {
        try {
            const bd = JSON.parse(fs.readFileSync('bd.json', 'utf8'))
            bd.push(cliente)
            fs.writeFileSync('bd.json', JSON.stringify(bd), 'utf8')
            res.status(200).json({resposta: "Cliente cadastrado com sucesso!"})
        } catch(error) {
            res.status(500).json({resposta: error.message})
        }
    }    
})

app.get("/ola", (req, res)=>{
    res.send("Hello World!!")
})
    
app.get("/livros", (req, res)=>{
    const livros = require("./livros.json")
    res.json({resposta: livros})
})
    
app.listen(port, ()=>{
    console.log("API executando na porta" + port)
})
