var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.get('/', function (req, res) {

    res.sendfile("https://webitcloud.net/PW/1617/ACJ/wQuizz/view/login.html");

});

app.listen(port);