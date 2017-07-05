var express = require('express');
var app = express();
var request = require('request');
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {

    request('https://webitcloud.net/PW/1617/ACJ/wQuizz/view/login.html').pipe(res);
    // res.send("ola")

});

app.listen(port);