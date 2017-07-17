$(document).ready(function () {



    $("#registo").click(function () {



        $("#div_login").empty();

        $("#div_login").css({ "height": "540px", "top": "35%" });

        $("#div_login").append('<center> <img src="https://webitcloud.net/PW/1617/ACJ/wQuizz/imagens6quiz/logoA.png" class="img-responsive" id="logoA"/> </center><center><form><br><br><input type="text" class="form-control" id="user" placeholder="Nome"><br><input type="password" class="form-control" id="pwd" placeholder="Password"><br><input type="password" class="form-control" id="pwd2" placeholder="Confirmar Password"><br><input type="email" class="form-control" id="email" placeholder="E-mail"><button id="btnRegistar" type="submit" class="btn btn-greyscale join ng-binding" blocking="">          Registar        </button><br><a id="voltar" href="#pagLogin">Voltar</label></a><br><br</form></center>>');

        $("#logoA").css({ "width": "80%", "margin-top": "50px" });

        $("#btnRegistar").click(function () {
            var nome = $("#user").val();
            var passe = $("#pwd").val();
            var passe2 = $("#pwd2").val();
            var email = $("#email").val();
            var email2 = $("#emailConf").val();

            if (passe == passe2 && email == email2) {
                //  var data = JSON.stringify({ passe: passe, nome: nome, email: email });
                console.log("true")
                $.ajax({
                    type: "GET",
                    url: "https://wquizz.herokuapp.com/registo?nome=" + nome + "&passe=" + passe + "&email=" + email,
                    contentType: "application/json"
                });
                //informar que registo foi efetuado com sucesso
            }
            else {
                console.log("false")
            }

        });


        $("#voltar").click(function () {

            location.href = 'https://webitcloud.net/PW/1617/ACJ/wQuizz/view/login.html';



        });



    });

    $("#btnLogin").click(function () {
        console.log("entrei");

        var user1 = $("#user1").val();
        var passeUser = $("#pwd1").val();


        //console.log(user);


        $.ajax({
            type: "POST",
            url: "https://wquizz.herokuapp.com/login?user1=" + user1 + "&passeUser=" + passeUser,
            contentType: "application/json"
        }).done(function (data) {
            console.log(data);
            if (data === undefined) {
                console.log("erro");
            }
            else {
                location.href = 'https://wquizz.herokuapp.com/app';
                
                /*$("html").html(perguntas.html);
                $("body").html(perguntas.html);*/
                console.log("sucesso");
            }
        });
    });





});