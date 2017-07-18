var express = require('express');
var app = express();
var request = require('request');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var path = require('path');
var port = process.env.PORT || 3000;

var server1 = "wquizz.herokuapp.com";
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ["abc"]
}));

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'webitcloud.net',
    user: 'webitclo_G504',
    password: 'PW1617ESMAD_P2235',
    database: 'webitclo_G504'
});

var user="";
var jogoID="";
var userID=0;

app.get('/', function (req, res) {

    request('https://webitcloud.net/PW/1617/ACJ/wQuizz/view/login.html').pipe(res);

});


app.get('/app', function (req, res) {

    request("https://webitcloud.net/PW/1617/ACJ/wQuizz/view/jogo.html").pipe(res);

});



//Criar registo do utilizador
//app.use(express.bodyParser());
app.get('/registo', function (req, res) {



    var nome = req.param('nome');
    var passe = req.param('passe');
    var email = req.param('email');
    console.log(nome)
    var sql = "INSERT INTO Utilizador (nome_utilizador,password,email) VALUES ('" + nome + "','" + passe + "','" + email + "');";
    console.log(sql);
    connection.query(sql, function (err, rows, fields) {

    });
});

//verificar se utilizador existe para fazer login
app.post('/login', function (req, res) {
    var user1 = req.param('user1');
    var passeUser = req.param('passeUser');
    console.log(user1)
    //var sql = "SELECT EXISTS(SELECT * FROM Utilizador WHERE nome_utilizador like '" + user1+"');";
    var sql = "SELECT * FROM Utilizador WHERE email like '" + user1 + "' and password like'" + passeUser + "';"
    console.log(sql);
    connection.query(sql, function (err, rows, fields) {
        console.log(rows);
        if (!err) {
            if (rows[0] === undefined) {
                res.status(500).send("Erro no email ou password");
                console.log("erro");
                //res.send("erro");
            } else {
                req.session.user1 = rows[0].email;
                req.session.passeUser = rows[0].password;
                userID=rows[0].id_utilizador;
                user = rows[0].email;
                console.log("uID="+userID);
                res.status(200).send("Sucessos");
                console.log("sucesso");
                res.send("sucesso");
                res.redirect("/app");
            }
        }
        else {
            res.status(500).send("Serviço indisponivel");
        }
    });
});

//Vai buscar os temas à base de dados
app.get('/temas', function (req, res) {
    console.log("aparece temas");
    var sql = 'SELECT nome_tema from Tema;';
    connection.query(sql, function (err, rows, fields) {
        console.log(err);
        if (!err) {
            res.send(rows);
            //console.log(rows);
             //console.log("teste");
        }
        else
            console.log('Error while performing query. ');
    });
});

//vai buscar as perguntas à base de dados
 app.get('/perguntas', function (req, res) {
     var tema = req.param('tema'); //nome_tema
    var nivel = req.param('nivel'); //nivel da pergunta
     var nAleatorio = req.param('nAleatorio'); 
//     // connection.query('SELECT * from Perguntas where dificuldade=' + nivel + ' and id_tema like (select id_tema from Tema where nome_tema=' + tema + ');', function (err, rows, fields) {
//     //     res.send(rows);
//     // });
   var sql = "SELECT pergunta, id_pergunta, id_tipo_pergunta from Pergunta p, Tema t where p.id_tema=t.id_tema and nome_tema ='"+tema+"' and dificuldade="+nivel+" ORDER BY RAND() LIMIT "+nAleatorio+";";
      console.log(sql);
      connection.query(sql, function (err, rows, fields) {
      
        res.send(rows);
       //console.log(rows);
    });
});


app.post('/jogo', function(req, res){
    var tema = req.param('tema');
    var d = new Date();
    var n = d.getTime();
    jogoID=tema+n;
    var sql = "insert into Jogo (id_jogo, nome_jogo) values('"+jogo+"','"+tema+"');";
    console.log(sql);
    connection.query(sql, function(err,rows,fields){
        
    });
});

 app.get('/respostas', function(req, res){
    var perguntaID = req.param('perguntaID'); //id_pergunta
    var sql='SELECT r.id_resposta, resposta, validade, p.pontuacao_pergunta from Resposta r, Pergunta_Resposta p where id_pergunta='+perguntaID+' and r.id_resposta=p.id_resposta;';
     console.log(sql);
     connection.query(sql, function(err, rows,fields){
         res.send(rows);
     });
 });
/*
//Para trabalhar com as perguntas de tipo associacao
app.get('/associacao', function(req, res){
    var id = req.param('id');//id_pergunta
    connection.query('SELECT * from Perguntas where associacao='+pergunta+');', function(err, rows,fields){
        res.send(rows);
    });
});*/

//adiciona a pontuação de um utilizador num determinado jogo à BD
app.post('/pontuacao', function(req,res){
    var pontos = req.param('pontos');
    var sql ="Insert into Utilizador_Jogo (id_utilizador, id_jogo, pontuacao_utilizador) values ("+userID+",'"+jogoID+"',"+pontos+");";
    connection.query(sql,function(err,rows,fields){
        
    });
});

app.get('/rankingTema', function(req, res){
    var tema = req.param('tema');
    //nome utilizador, tema, pontuação
    var sql="SELECT nome_utilizador, pontuacao_utilizador, j.nome_jogo from Utilizador u, Jogo j, Utilizador_Jogo uj where nome_jogo='"+tema+"' and j.id_jogo=uj.id_jogo and u.id_utilizador=uj.id_utilizador order by pontuacao_utilizador desc;"
    connection.query(sql, function(err, rows,fields){
        res.send(rows);
    });
});

app.get('/ranking', function(req, res){
    //nome utilizador, tema, pontuação
    var sql="SELECT nome_utilizador, pontuacao_utilizador, nome_jogo from Utilizador u, Jogo j, Utilizador_Jogo uj where j.id_jogo=uj.id_jogo and u.id_utilizador=uj.id_utilizador order by pontuacao_utilizador desc;";
    connection.query(sql, function(err, rows,fields){
        res.send(rows);
    });
});

app.get('/logout', function(req, res){
    userID=0;
    req.session = null;
    req.session.destroy();
    res.redirect("/");
    console.log(userID);
});

app.listen(port);
