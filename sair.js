$(document).ready(function () {

    $("#btnSair").click(function () {
        //fazer logout da aplicação
         //location.href = 'https://wquizz.herokuapp.com/';
         $.ajax({
            type: "GET",
            url: "https://wquizz.herokuapp.com/logout",
            contentType: "application/json"
        }).done(function (data) {
             if (data === undefined) {
                console.log("erro");
            }
            else {

                location.href ='https://wquizz.herokuapp.com/';

                /*$("html").html(perguntas.html);
                $("body").html(perguntas.html);
                console.log("sucesso");*/
            }
        });
    });


});