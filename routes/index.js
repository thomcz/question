var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/db';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		getQuestions(db, res, function() {
			db.close();
		});
	});
    
});

router.get('/myquestion', function(req, res) {
    res.render('myquestion', { title: 'fuck' , data: ['cats','dogs','bird']});
});

router.get('/ask', function(req, res) {
    res.render('ask', { title: 'fuck' , data: ['cats','dogs','bird']});
});
router.get('/ask/:question', function(req, res) {
    MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		insertQuestion(req, res, db, function() {
			db.close();
		});
	});
});

var insertQuestion = function(req, res, db, callback) {		
	var text = req.params.question;
	var user_id = '100a';
	
	db.collection('questions').insertOne({
		"text" : text,
		"user_id" : user_id,
		"date" : new Date(),
		"votes" : 0
	}, function (err, result) {
		assert.equal(err, null);
		console.log("inserted");
		callback(result);
		res.redirect('/ask');	
	});
};

var getQuestions = function(db, res, callback) {
   var cursor =db.collection('questions').find().toArray(function(err, items) {
	   res.render('index', {questions : items});
   });
   
   /*cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         res.render('index', {q : JSON.stringify(doc)});
      } else {
         callback();
      }
   });*/
};

var getQuestions2 = function(db, res, callback) {
   var cursor =db.collection('questions').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.log(JSON.stringify(doc));
      } else {
         callback();
      }
   });
};

router.get('/question', function(req, res) {
    res.render('question', { title: 'fuck' , data: ['cats','dogs','bird']});
});

router.get('/answer', function(req, res) {
    res.render('answer', { title: 'fuck' , data: ['cats','dogs','bird']});
});
router.get('/test', function(req, res) {
    MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		getQuestions2(db, res, function() {
			db.close();
		});
	});
});

module.exports = router;