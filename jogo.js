var urlc = "https://wquizz.herokuapp.com/"

//tempo
function Countdown(options) {
    var timer,
        instance = this,
        seconds = options.seconds || 30,
        updateStatus = options.onUpdateStatus || function () { },
        counterEnd = options.onCounterEnd || function () { };

    function decrementCounter() {
        updateStatus(seconds);
        if (seconds === 0) {
            counterEnd();
            instance.stop();
        }
        seconds--;
    }

    this.start = function () {
        clearInterval(timer);
        timer = 0;
        seconds = options.seconds;
        timer = setInterval(decrementCounter, 1000);
    };

    this.stop = function () {
        clearInterval(timer);
    };
}

$(document).ready(function () {



    var temas;

    //modo de jogo single

    $("#single").click(function () {

        console.log("modo single")

        $("#div_tipoJogo").empty();

        $("#div_tipoJogo2").empty();

        $("#div_tipoJogo2").append(" <div class='row' id=div_tipoJogo2'><div class='col-sm-2'></div><div class='col-sm-8'><br><br><br><h3 id='tema_Jogo'>Selecione o Tema para Jogar:</h3><br></div><div class='col-sm-2'></div></div>");

        $.ajax({

            type: "GET",

            url: "/temas",

            contentType: "application/json"

        }).done(function (data) {

            temas = '<div class="row" id="div_temas">';

            console.log("teste")

            var i = 0;

            var nomes = [];

            $.each(data, function (key, data) {



                //+="criar botao html"+data.nome_tema;

                temas += "<div class='col-sm-3'><center><div  id='temasSingle'><center><div class='div_imag_tema' id='" + data.nome_tema + "'><img src='https://webitcloud.net/PW/1617/ACJ/wQuizz/imagens6quiz/" + data.nome_tema + ".jpg' class='img-responsive' id='logoTema'><p>" + data.nome_tema + "</p></div></center></div></center></div>";

                nomes[i] = data.nome_tema;

                i++;

                // cont++;

                console.log(nomes[i])

            });

            $("#div_tipoJogo2").append(temas + "</div>");

            for (var t = 0; t < i; t++) {
                $("#" + nomes[t]).click(function () {
                    $("#div_tipoJogo").empty();
                    $("#div_tipoJogo2").empty();
                    var perguntasID = 0;
                    var nomesDiv = [];
                    var idObj = $(this).attr('id');
                    console.log($(this).attr('id'));
                    //var validade = [][]; //validade da resposta
                    //buscar pontuação reposta
                    var validade = [];
                    var r = 0;
                    var v = 0;
                    var contTeste = 0;//diferenciar cores botões
                    var pontuacaoP = [];//Guarda o valor de cada pergunta

                    var nivel1 = '<div class="row" id= "div_nivel"><div class="col-sm-3"></div><div class="col-sm-6"><h3 id="temaEscolhido">' + idObj + '</h3></div><div class="col-sm-3"></div></div>'
                    var nivel1 = '<div class="row" id= "div_nivel"><div class="col-sm-3"></div><div class="col-sm-6"><h3 id="temaEscolhido">' + idObj + '</h3></div><div class="col-sm-3"></div></div>'
                    var bar = "<div class='progress active progress-striped' id='progressouter'><div class='progress-bar' id='progress'></div></div>";
                    $("#div_tipoJogo2").append(nivel1);
                    $("#div_tipoJogo3").append(bar);
                    var respostas = '<div class="row" id="div_resp">';
                    $.ajax({
                        type: "GET",
                        url: urlc + "jogo?tema=" + idObj,
                        contentType: "application/json"
                    });
                    //perguntas
                    //for para dificuldade perguntas
                    for (var n = 1; n <= 6; n++) {

                        console.log("n" + n);
                        $.ajax({
                            type: "GET",
                            url: urlc + "perguntas?tema=" + idObj + "&nivel=" + n + "&nAleatorio=" + 6,
                            contentType: "application/json"
                        }).done(function (data) {

                            //console.log(data[1]);
                            //console.log("hh" + data);


                            //ir buscar cada pergunta ao array data
                            $.each(data, function (key, data) {
                                //console.log(1);

                                //var tempo = 1;

                                var pergunta = '<div class="row"><div class="col-sm-2"></div>';
                                console.log("hh2");
                                perguntasID = data.id_pergunta;
                                //console.log(perguntasID[p]);
                                pergunta += '<div class="col-sm-8"><center><div id="' + data.id_pergunta + '"><h2 id="pergunta">' + data.pergunta + '</h2><br><br></div></div><div class="col-sm-2"></div></div>';
                                var respostas = '<div class="row" id="div_resp">';
                                var tipoPergunta = data.id_tipo_pergunta;
                                //var t = false;
                                /*if (tipoPergunta == 3) {
                                        $.ajax({
                                                type: "GET",
                                                url: urlc + "associacao?id=" + perguntasID,
                                                contentType: "application/json"
                                        }).done(function (data) {
                                            //ir colocar as perguntas em html e ir buscar as respectivas respostas
                                        });
                                }
                                else{*/
                                //respostas
                                $.ajax({
                                    type: "GET",
                                    url: urlc + "respostas?perguntaID=" + perguntasID,
                                    contentType: "application/json"
                                }).done(function (data) {
                                    console.log("hh" + data);
                                    $.each(data, function (key, data) {
                                        //console.log("hh2");

                                        var idR = data.id_resposta;
                                        //console.log("b<dhfgh" + idR)
                                        if (data.validade == 1) {
                                            validade[v] = idR;
                                            console.log('v ' + validade[v]);
                                            pontuacaoP[v] = data.pontuacao_pergunta;
                                            console.log('p ' + pontuacaoP[v]);
                                            v++;
                                        }
                                        nomesDiv[r] = idR;
                                        //console.log("dsf" + nomesDiv[r]);
                                        //Escolha múltipla
                                        if (tipoPergunta == 1) {
                                            console.log("Escolha multipla");
                                            respostas += '<div class="col-sm-6"><center><div class="div_resposta" id="' + data.id_resposta + '"><button type="button" class="btn" id="btn_resposta">' + data.resposta + '</button></div></center></div>';
                                        }/*
                                        //Verdadeiro ou falso
                                        else if (tipoPergunta == 2) {

                                        }
                                        //Imagens
                                        if (tipoPergunta == 4) {

                                        }
                                        //Resposta curta
                                        if (tipoPergunta == 5) {

                                        }
                                        //ordenação
                                        if (tipoPergunta == 6) {

                                        }*/
                                        //perguntas[pID] = data.id_pergunta;

                                        //r++;

                                        /*contTeste++;
                                        console.log(" cont: " + contTeste);
                                        if (contTeste == 1 || contTeste == 4 || contTeste == 5 || contTeste == 7 || contTeste == 10 || contTeste == 11 || contTeste == 13 || contTeste == 16 || contTeste == 17 || contTeste == 19 || contTeste == 22 || contTeste == 23 || contTeste == 25 || contTeste == 28 || contTeste == 29 || contTeste == 31 || contTeste == 34 || contTeste == 35 || contTeste == 37 || contTeste == 40 || contTeste == 41) {
                                            respostas += '<div class="col-sm-6"><center><div class="div_resposta" id="' + data.id_resposta + '"><button type="button" class="btn" id="btn_resposta">' + data.resposta + '</button></div></center></div>';
                                            console.log(" par: " + contTeste);

                                        }
                                        else {
                                            respostas += '<div class="col-sm-6"><center><div class="div_resposta" id="' + data.id_resposta + '"><button type="button" class="btn" id="btn_resposta2">' + data.resposta + '</button></div></center></div>';

                                        }*/

                                        r++;
                                    });
                                    respostas += '</div>';

                                    $("#div_tipoJogo").append(pergunta + respostas);
                                    var pontuacaoJoagador = 0;//pontuação do jogador
                                    console.log("a" + pontuacaoJoagador);
                                    for (var k = 0; k < r; k++) {
                                        $("#" + nomesDiv[k]).click(function () {
                                            for (var d = 0; d < v; d++) {
                                                var idResp = $(this).attr('id');
                                                console.log('jdoa' + validade[d]);
                                                if (idResp == validade[d]) {
                                                    console.log("true");
                                                    console.log("fsa" + idResp + "fdsf" + validade[d]);
                                                    $("#" + idResp).css('background-color', '#00cc00');
                                                    console.log("hda" + pontuacaoP[v]);
                                                    pontuacaoJoagador += 30;//não estava a ir buscar a poontuação da resposta
                                                    //pontuacaoJoagador += pontuacaoP[v];
                                                    console.log("k" + pontuacaoJoagador);
                                                }
                                                else if (idResp != validade[d]) {
                                                    $("#" + idResp).css("background", "red");
                                                }
                                            }
                                        });
                                    }
                                    $('#div_tipoJogo3').on(function () {
                                        // do stuff
                                        var timetogo = 30;
                                        console.log(timetogo);

                                        var myCounter = new Countdown({
                                            seconds: timetogo, // number of seconds to count down
                                            onUpdateStatus: function (sec) {
                                                elapsed = timetogo - sec;
                                                $('.progress-bar').width(((elapsed / timetogo) * 100) + "%");
                                                //tempo = 1;
                                            }, // callback for each second
                                            onCounterEnd: function () {
                                                //alert('counter ended!');
                                                //tempo = 0;

                                            } // final action
                                        });

                                        myCounter.start();
                                    });

                                    var timetogoFirst = 30;
                                    var myCounterFirst = new Countdown({
                                        seconds: timetogoFirst, // number of seconds to count down
                                        onUpdateStatus: function (sec) {
                                            elapsed = timetogoFirst - sec;
                                            $('.progress-bar').width(((elapsed / timetogoFirst) * 100) + "%");

                                            //tempo = 1;
                                        }, // callback for each second
                                        onCounterEnd: function () {
                                            //alert('counter ended!');
                                            //tempo = 0;

                                            $.ajax({
                                                ype: "GET",
                                                url: urlc+"pontuacao?pontos=" + pontuacaoJoagador,
                                                contentType: "application/json"
                                            });
                                            //location.href = 'https://wquizz.herokuapp.com/app';

                                        } // final action
                                    });
                                    myCounterFirst.start();
                                });

                            });//fim perguntas
                        });


                    }//fim for dificuldade





                });


            }//fim for temas


        });





        console.log("sai")





    });





});