$(document).ready(function () {

    $("#btnRanking").click(function () {
        //falta filtar
        $("#div_tipoJogo").empty();
        $("#div_tipoJogo2").empty();
        $("#div_tipoJogo2").append(" <div class='row'><div class='col-sm-2'></div><div class='col-sm-8'><br><br><br><h3 id='tema_Jogo'>Ranking:</h3><br></div><div class='col-sm-2'></div></div>");
        var nTemas = 0;
        var nomes = [];
        $.ajax({
            type: "GET",
            url: "https://wquizz.herokuapp.com/temas",
            contentType: "application/json"
        }).done(function (data) {
            console.log("entrei");
            // var temasLista = '<div class="wrapper"><select class="temas">';
            var temasLista = ' <div class="row"><div class="col-sm-2"></div><div class="col-sm-8"><div class="dropdown" ><button class="btn btn-default dropdown-toggle temas" type="button" id="temas1" data-toggle="dropdown">Pesquisar por Tema<span class="caret"></span></button> <ul id="combo_temas" class="dropdown-menu" role="menu" aria-labelledby="temas1">'
            $.each(data, function (key, data) {
                // temasLista += '<option value="' + data.nome_tema + '">' + data.nome_tema + '</option>';
                temasLista += '<li role="presentation" id="' + data.nome_tema + '"><a role="menuitem" tabindex="-1" href="#">' + data.nome_tema + '</a></li>'
                nomes[i] = data.nome_tema;
                nTemas++;

            });
            // $("#div_tipoJogo").append(temasLista + '</select><input class="timeTextBox" name="timebox" maxlength="5"/></div>');
            $("#div_tipoJogo2").append(temasLista + ' </ul></div></div><div class="col-sm-2"></div></div><br><br>');
        });

        $('#temas1').click(function () {
            for (var i = 0; i < nTemas; i++) {
                $("#" + nomes[t]).click(function () {
                    $("#div_tipoJogo").empty();
                    var idObj = $(this).attr('id');
                    $.ajax({
                        type: "GET",
                        url: "https://wquizz.herokuapp.com/rankingTema?tema=" + idObj,
                        contentType: "application/json"
                    }).done(function (data) {
                        var content = '<div class="row"><div class="col-sm-2"></div><div class="col-sm-8"><table class="table table-hover" id="table_ranking"><thead ><tr><th>Posição</th><th>Nome</th><th>Pontuação</th><th>Jogo</th></tr></thead><tbody>'
                        var cont = 0;
                        $.each(data, function (key, data) {
                            cont++;
                            console.log(cont)
                            content += '<tr><td>' + cont + '</td><td>' + data.nome_utilizador + '</td><td>' + data.pontuacao_utilizador + '</td><td>' + data.nome_jogo + '</td><tr>'
                        });
                    });
                });
            }
        });
        var tema = $(".temas").change(function () {
            $(".timeTextBox").val($(".editableBox option:selected").html());
        });

        console.log(tema);
        $.ajax({
            type: "GET",
            url: "https://wquizz.herokuapp.com/ranking",
            contentType: "application/json"
        }).done(function (data) {
            var content = '<div class="row"><div class="col-sm-2"></div><div class="col-sm-8"><table class="table table-hover" id="table_ranking"><thead ><tr><th>Posição</th><th>Nome</th><th>Pontuação</th><th>Jogo</th></tr></thead><tbody>'
            var cont = 0;
            $.each(data, function (key, data) {
                cont++;
                console.log(cont)
                content += '<tr><td>' + cont + '</td><td>' + data.nome_utilizador + '</td><td>' + data.pontuacao_utilizador + '</td><td>' + data.nome_jogo + '</td><tr>'
            });
            $("#div_tipoJogo").append(content + ' </tbody></table></div><div class="col-sm-2"></div></div>');
        });
    });



});
