import * as express from "express";
import * as db from "../db";
var app = express.Router();
//var user_id : string;

/* GET home page. */
app.get('/:userid', (req, res) => {
	db.getMyQuestions(req.params.userid, items => {
		res.render('index', {questions : items, userid : req.params.userid});
	});    
});

app.get('/myquestion/:question_id', (req, res) => {
	db.getQuestion(req.params.question_id, question => {
		db.getAnswers(req.params.question_id, answers => {
			res.render('myquestion', {question : question, answers : answers});
		});
	});
});

app.get('/ask/:userid', (req, res) => {
    res.render('ask', {userid : req.params.userid});
});
app.get('/ask/:userid/:question', (req, res) => {
	db.insertQuestion(req.params.question, req.params.userid, question => {
		res.redirect('/ask/' + req.params.userid);
	});
});

app.get('/question/:userid', (req, res) => {
	db.getQuestions(req.params.userid, items => {
		res.render('question', {questions : items, userid : req.params.userid});
	});
});

app.get('/answer/:userid/:qid/:text', (req, res) => {
	res.render('answer', {qid: req.params.qid, text: req.params.text, userid : req.params.userid});
});

app.get('/answering/:userid/:qid/:text', (req, res) => {
	db.insertAnswer(req.params.qid, req.params.text, req.params.userid, answer => {
		console.log(answer);
		res.redirect('/question/' + req.params.userid);
	});
});

module.exports = app;