const elephantsql = require('../config/elephantsql');

const pegarPergunta = (req, res) => { //Pegar pergunta por ID.
    const sql = 'SELECT * FROM perguntas p WHERE p.pergunta_id = $1';
    const value = [req.params.id];
    elephantsql.query(sql, value).then((result) => {
        if(result.rowCount == 0) {
           return res.json( "Id para busca sem dados cadastrados" );
        }
        res.json({ pergunta: result.rows });
    }, error => {
        res.json("Id de pesquisa inválido, motivo: ", error );
    });
} 

const editarPergunta = (req, res) => { //Editar uma pergunta.
    const sql = 'UPDATE perguntas SET enunciado = $1, alternativa_correta = $2,' +
    'alternativa_a = $3, alternativa_b = $4, alternativa_c = $5, alternativa_d = $6,' + 
    'alternativa_e = $7 WHERE pergunta_id = $8;';
   if(req.body.enunciado == "") {
       return res.json(
           "Pergunta não salva, preencha o campo da pergunta com uma pergunta!" )
   }
   if(req.body.alternativa_correta == "") {
       return res.json( 
           "Pergunta não salva, o campo Resposta Correta tem que conter um valor válido!" )
   }
   if(req.body.alternativa_a == "" || req.body.alternativa_b == "" || req.body.alternativa_c == ""
       || req.body.alternativa_d == "" || req.body.alternativa_e == "") {
           return res.json( 
               "Pergunta não salva, os campos das alternativas tem que conter um valor!" )
   }
   const pergunta = [req.body.enunciado, req.body.alternativa_correta, req.body.alternativa_a,
       req.body.alternativa_b, req.body.alternativa_c, req.body.alternativa_d,
       req.body.alternativa_e, req.params.id];
    elephantsql.query(sql, pergunta).then(() => {
           return res.json( 'Pergunta atualizada!' );
   }, error => {
       return res.json( "Pergunta não atualizada, motivo: ", error );
   });
}

const salvarPergunta = (req, res) => { //Salvar uma pergunta.
    if(req.body.enunciado == "") {
        console.log(req.body.enunciado);
        return res.json( "Pergunta não salva, preencha o campo da pergunta com uma pergunta!" );
    }
    if(req.body.alternativa_correta == "") {
        console.log(req.body.alternativa_correta);
        return res.json( 
            "Pergunta não salva, o campo Resposta Correta tem que conter um valor válido!" );
    }
    if(req.body.alternativa_a == "" || req.body.alternativa_b == "" || req.body.alternativa_c == ""
        || req.body.alternativa_d == "" || req.body.alternativa_e == "") {
            console.log(req.body);
            return res.json( "Pergunta não salva, os campos das alternativas tem que conter um valor!" );
    }
    const sql = 'INSERT INTO perguntas(enunciado, alternativa_correta, alternativa_a, alternativa_b,' + 
        'alternativa_c, alternativa_d, alternativa_e) VALUES ($1, $2, $3, $4, $5, $6, $7);';
    const value = [req.body.enunciado, req.body.alternativa_correta, req.body.alternativa_a, 
        req.body.alternativa_b, req.body.alternativa_c, req.body.alternativa_d, req.body.alternativa_e];
    elephantsql.query(sql, value).then(() => {
            return res.json( 'Pergunta salva com sucesso!' );
    }, error => {
        res.json( "Erro ao salvar pergunta, motivo: ", error );
    });
}

module.exports = {
    pegarPergunta,
    editarPergunta,
    salvarPergunta
}