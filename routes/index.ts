import * as express from "express";
import * as db from "../db";

var app = express.Router();

/* GET home page. */
app.get('/', (req, res) => {
	db.getQuestions(res, items => {
		res.render('index', {questions : items});
	});    
});

app.get('/myquestion/:question', (req, res) => {
    res.render('myquestion', { myQuestion: req.params.question});
});

app.get('/ask', (req, res) => {
    res.render('ask', { title: 'fuck' , data: ['cats','dogs','bird']});
});
app.get('/ask/:question', (req, res) => {
	db.insertQuestion(req.params.question, "100a", question => {
		res.redirect('/ask');
	});
});

app.get('/question', (req, res) => {
    res.render('question', { title: 'fuck' , data: ['cats','dogs','bird']});
});

app.get('/answer', (req, res) => {
    res.render('answer', { title: 'fuck' , data: ['cats','dogs','bird']});
});

module.exports = app;