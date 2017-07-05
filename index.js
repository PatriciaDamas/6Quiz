var urlc = "http://localhost:3000/"




$(document).ready(function () {

    $("#registo").click(function () {

        $("#div_login").empty();
        $("#div_login").css({ "height": "540px", "top": "35%" });
        $("#div_login").append('<center> <img src="imagens/logoA.png" class="img-responsive" id="logoA"/> </center><center><form><br><br><input type="text" class="form-control" id="user" placeholder="Nome"><br><input type="password" class="form-control" id="pwd" placeholder="Password"><br><input type="password" class="form-control" id="pwd2" placeholder="Confirmar Password"><br><input type="email" class="form-control" id="email" placeholder="E-mail"><button id="btnRegistar" type="submit" class="btn btn-greyscale join ng-binding" blocking="">          Registar        </button><br><a id="voltar" href="#pagLogin">Voltar</label></a><br><br</form></center>>');
        $("#logoA").css({ "width": "80%", "margin-top": "50px" });

        $("#voltar").click(function () {
            location.href = 'login.html';

        });

    });



});