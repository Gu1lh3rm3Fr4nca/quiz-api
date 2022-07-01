const elephantsql = require('../config/elephantsql');

const pegarPergunta = (req, res) => { //Pegar pergunta por ID.
    const sql = 'SELECT * FROM perguntas p WHERE p.pergunta_id = $1';
    const value = [req.params.id];
    elephantsql.query(sql, value).then((result) => {
        res.json({ pergunta: result.rows });
    }, error => {
        res.json({ mensagem: "Id de pesquisa inválido: " + error });
    });
} 

const editarPergunta = (req, res) => { //Editar uma pergunta.
    const sql = 'UPDATE perguntas SET enunciado = $1, alternativa_correta = $2,' +
     'alternativa_a = $3, alternativa_b = $4, alternativa_c = $5, alternativa_d = $6,' + 
     'alternativa_e = $7 WHERE pergunta_id = $8;';
    if(req.body.enunciado == "") {
        return res.json("mensagem: Pergunta não salva, preencha o campo da pergunta com uma pergunta!")
    }
    if(req.body.alternativa_correta == "") {
        return res.json("mensagem: Pergunta não salva, o campo alternativa correta tem que conter um valor válido!")
    }
    if(req.body.alternativa_a == "" || req.body.alternativa_b == "" || req.body.alternativa_c == ""
        || req.body.alternativa_d == "" || req.body.alternativa_e == "") {
            return res.json("mensagem: Pergunta não salva, os campos das alternativas tem que conter um valor!")
    }
    const pergunta = [req.body.enunciado, req.body.alternativa_correta, req.body.alternativa_a,
        req.body.alternativa_b, req.body.alternativa_c, req.body.alternativa_d,
        req.body.alternativa_e, req.params.id];
    elephantsql.query(sql, pergunta).then(() => {
        res.json({ message: 'Pergunta atualizada!' });
    }, error => {
        res.json({ error: error });
    });
}

const salvarPergunta = (req, res) => { //Salvar uma pergunta.
    const sql = 'INSERT INTO perguntas' + 
        '(enunciado, alternativa_correta, alternativa_a, alternativa_b,' + 
        'alternativa_c, alternativa_d, alternativa_e)' + 
        'VALUES ($1, $2, $3, $4, $5, $6, $7);';
    if(req.body.enunciado == "") {
        return res.json("mensagem: Pergunta não salva, preencha o campo da pergunta com uma pergunta!")
    }
    if(req.body.alternativa_correta == "") {
        return res.json("mensagem: Pergunta não salva, o campo alternativa correta tem que conter um valor válido!")
    }
    if(req.body.alternativa_a == "" || req.body.alternativa_b == "" || req.body.alternativa_c == ""
        || req.body.alternativa_d == "" || req.body.alternativa_e == "") {
            return res.json("mensagem: Pergunta não salva, os campos das alternativas tem que conter um valor!")
    }
    const value = [req.body.enunciado, req.body.alternativa_correta, req.body.alternativa_a, 
        req.body.alternativa_b, req.body.alternativa_c, req.body.alternativa_d, req.body.alternativa_e];
    elephantsql.query(sql, value).then(() => {
        res.json({ message: 'Pergunta salva com sucesso!' });
    }, error => {
        res.json({ error: error });
    });
}

module.exports = {
    pegarPergunta,
    editarPergunta,
    salvarPergunta
}