$(document).ready(function () {

    $("#btnInicial").click(function () {
        //location.href = 'https://wquizz.herokuapp.com/app';
        $.ajax({
            type: "GET",
            url: "https://wquizz.herokuapp.com/inicial",
            contentType: "application/json"
        });
    });

});