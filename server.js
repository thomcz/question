//config
var confAppPort = 80;
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var routes = require("./routes/index");
//App
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
// Make our db accessible to our router
/*app.use(function(req,res,next){
    req.db = db;
    next();
});*/
app.listen(confAppPort);
module.exports = app;
