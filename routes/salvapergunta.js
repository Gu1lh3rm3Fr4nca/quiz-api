const express = require('express');
const router = express.Router();
const perguntaController = require('../controller/pergunta');

router.get('/:id', perguntaController.pegarPergunta);
router.put('/:id', perguntaController.editarPergunta);
router.post('/', perguntaController.salvarPergunta);

module.exports = router;