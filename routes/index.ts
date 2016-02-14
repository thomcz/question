import * as express from "express";
import * as db from "../db";

var app = express.Router();

/* GET home page. */
app.get('/', (req, res) => {
	db.getMyQuestions(res, items => {
		res.render('index', {questions : items});
	});    
});

app.get('/myquestion/:question_id', (req, res) => {
    res.render('myquestion', { myQuestion: req.params.question_id});
});

app.get('/ask', (req, res) => {
    res.render('ask');
});
app.get('/ask/:question', (req, res) => {
	db.insertQuestion(req.params.question, "100a", question => {
		res.redirect('/ask');
	});
});

app.get('/question', (req, res) => {
	db.getQuestions(items => {
		res.render('question', {questions : items});
	});
});

app.get('/answer/:qid/:text', (req, res) => {
	res.render('answer', {qid: req.params.qid, text: req.params.text});
});

app.get('/answer', (req, res) => {
    res.render('answer', { title: 'fuck' , data: ['cats','dogs','bird']});
});

module.exports = app;