var express = require('express');
var bodyParser = require('body-parser');

//var MongoClient = require('mongodb').MongoClient;
//var assert = require('assert');
//var ObjectId = require('mongodb').ObjectID;
//var db = 'mongodb://localhost:27017/test';

var path = require('path');
var routes = require('./routes/index');


// create our app
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

// A browser's default method is 'GET', so this
// is the route that express uses when we visit
// our site initially.
/*app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname +'/index.html'));
});

// This route receives the posted form.
// As explained above, usage of 'body-parser' means
// that `req.body` will be filled in with the form elements
app.post('/', function(req, res){
  var userName = req.body.userName;
  MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});
});

app.get('/index', function(req, res){
	MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	find(db, function() {
      db.close();
	});
	});
});

var insertDocument = function(db, callback) {
   db.collection('test').insertOne( {
      "name" : "name"      
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the test collection.");
    callback(result);
  });
};

var find = function(db, callback) {
   var cursor =db.collection('test').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         document.getElementById("result").innerHTML = "tet";
		 console.dir(doc);
      } else {
         callback();
      }
   });
};*/

app.listen(80);
module.exports = app;