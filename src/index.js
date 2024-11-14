import express from 'express'
import cors from 'cors'


const app = express()
const port = 3002
app.use(express.json())
app.use(cors())

const pessoas = []

let cont = 1
const id = () => cont++

const cadastroPessoas = (nome, dataNascimento, telefone) => {
    pessoas.push({id: id(), nome, dataNascimento, telefone})
}


app.get('/pessoas', (req, res) => {
    res.send(pessoas)
})

app.post('/pessoas', (req, res) => {
    cadastroPessoas(req.body.nome, req.body.dataNascimento, req.body.telefone)
    res.send('Pessoa cadastrada com sucesso!')
})

app.put('/pessoas/:id', (req, res) => {
    const encontrarPessoa = pessoas.find(pessoa => pessoa.id === parseInt(req.params.id))
    if(encontrarPessoa) encontrarPessoa.nome = req.body.nome
    if(encontrarPessoa) encontrarPessoa.dataNascimento = req.body.dataNascimento
    if(encontrarPessoa) encontrarPessoa.telefone = req.body.telefone
    res.send("Pessoa alterada com sucesso!")
});

// //delete e retorne um novo array
// app.delete('/pessoas/:id', (req, res) => {
//     const filtrar = pessoas.filter(pessoa => pessoa.id !== parseInt(req.params.id))
//     res.send(filtrar)
// })


// delete do array original
app.delete("/pessoas/:id", (req, res) => {
    const index = pessoas.findIndex(pessoa => pessoa.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send("Pessoa não encontrada.")
    }
    pessoas.splice(index, 1)
    res.send("Cliente deletado com sucesso!")
});


app.listen(port, () => {
    console.log('Servidor Funcionando')
})




