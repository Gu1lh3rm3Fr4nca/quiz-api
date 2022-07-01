const express = require('express');
const bodyParser = require('body-parser');
const salvaRoutes = require('./routes/salvapergunta')

const server = express();
const port = 3000;

server.use(bodyParser.json());

server.use('/pergunta', salvaRoutes);

// importação de rotas aqui...

server.listen(port, () => {
    console.log(`API do quiz rodando na porta: ${port}`);
});
