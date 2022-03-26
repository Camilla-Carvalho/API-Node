const express = require('express') // require = importar a biblioteca express, que implementa o servidor http

const app = express(); // Recebendo método express (função)
app.use(express.json());

const checarApi = function (request, response) {  // Request == solicitação do cliente / respose == resposta
    response.json({
        ok: true   
    })
};

app.get('/api', checarApi)  // Rota GET, para buscar um recurso na aplicação

var usuarios = [  
    {
        id: 1,
        nome: 'Camilla',
        email: 'camillacarvalho.c4@gmail.com',
        idade: 19
    },
    {
        id: 2,
        nome: 'Túlio',
        email: 'tuliomf09@gmail.com',
        idade: 23
    }
]


app.get('/api/usuario', function(request, response) {
    response.json(usuarios)
})

// '/api/usuario/:id' == PATH
app.get('/api/usuario/:id', function(request, response) {
    const id = parseInt(request.params.id);
    const usuario = usuarios.find(function(u) {
        return u.id === id
    }); // '1' !== 1 // u => u.id === id (Arrow function)

    if (!usuario) {  // !usuario == undefined
        response.staus(404).json({
            message: 'Usuário não encontrado'
        })
    }
    
    response.json(usuario); // response.status(200).json(usuario);
})

app.post('/api/usuario', (request, response) => {
    const { usuario } = request.body;   // desestruturação de request.body
    const encontrado = usuarios.find(u => u.email === usuario.email);
    
    if (encontrado) {
        response.status(409).json({
            message: 'Usuário já existente'
        })
    }

    usuarios.push(usuario);

    response.json(usuarios);
})


app.listen(3000, function() {
    console.log('Servidor rodando na porta 3000')
})

// API = rotas chamando funções (devolver para clientes)
// "start": "node src/index.js" -> Comando npm start para iniciar a aplicação
