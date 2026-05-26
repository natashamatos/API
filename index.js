const express = require('express')
const app = express()
const port = 3000

app.get("/ola", (req, res)=>{
    res.send("Hello World!")
})

app.get("/livros", (req, res)=>{
    const livros = require("./livros.json")
    res.json({resposta: livros})
})

app.listen(port, ()=>{
    console.log("API executando na porta" + port)
})