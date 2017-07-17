// var urlc = "http://localhost:3000/"

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
        });
      

        console.log("sai")


    });


});