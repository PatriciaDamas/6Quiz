$(document).ready(function () {

    $("#btnSobre").click(function () {

        $("#div_tipoJogo").empty();
        $("#div_tipoJogo2").empty();
        var sobre = '<div class="row"><div class="col-sm-12"><center><h3 id="desc">Sobre:</h3><br><p>SixQuiz é uma plataforma interativa e responsiva, onde os participantes poderão responder a um conjunto de perguntas de forma rápida e eficiente, de forma individual ou em grupo. </p><br></div><center><hr></center><div class="col-sm-12"><center><h3 id="equipa">Desenvolvedores:</h3></center><br><br></div></div><div class="row" id="div_sobre"><div class="col-sm-4" id="div_claudia"><center><img src="https://webitcloud.net/PW/1617/ACJ/wQuizz/imagens6quiz/claudia.jpg" class="w3-circle"><h4>Cláudia Damas</h4><div class="col-sm-12"><a href="#"><img src="https://webitcloud.net/PW/1617/ACJ/wQuizz/imagens6quiz/face.png" class="imgSocial" id="cfb"></a></div></center></div><div class="col-sm-4" id="div_antonio"><center><img src="https://webitcloud.net/PW/1617/ACJ/wQuizz/imagens6quiz/antonio.jpg" class="w3-circle"><h4>António Carvalho</h4><div class="col-sm-12"><a href="#"><img src="https://webitcloud.net/PW/1617/ACJ/wQuizz/imagens6quiz/face.png" class="imgSocial" id="afb"></a></div></center></div><div class="col-sm-4" id="div_joana"><center><img src="https://webitcloud.net/PW/1617/ACJ/wQuizz/imagens6quiz/joana.jpg" class="w3-circle"><h4>Joana Mendes</h4><div class="col-sm-12"><a href="#"><img src="https://webitcloud.net/PW/1617/ACJ/wQuizz/imagens6quiz/face.png" class="imgSocial" id="jfb"></a></div></center></div></div>';
        $("#div_tipoJogo2").append(sobre);
        $("#cfb").click(function () {
            window.open("https://www.facebook.com/ticha.damas");
        });
        $("#afb").click(function () {
            window.open("https://www.facebook.com/antonio.carvalho.315213");
        });
        $("#jfb").click(function () {
            window.open("https://www.facebook.com/profile.php?id=100002542120344");
        });
    });

});
