var http = require("http");
var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));
app.set("view engine", "vash");

app.get("/", function (req, res) {
    res.render("index");
});

var server = http.createServer(app);

server.listen(3000);