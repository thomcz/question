//config
var confAppPort: number = 80;

import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as routes from "./routes/index";

//App
var app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));
app.use('/', routes);

app.use(express.static(__dirname + '/css'));


// Make our db accessible to our router
/*app.use(function(req,res,next){
    req.db = db;
    next();
});*/
app.listen(confAppPort);
module.exports = app;