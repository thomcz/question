var express = require("express");
var db = require("../db");
var app = express.Router();
/* GET home page. */
app.get('/', function (req, res) {
    db.getQuestions(res, function (items) {
        res.render('index', { questions: items });
    });
});
app.get('/myquestion/:question', function (req, res) {
    res.render('myquestion', { myQuestion: req.params.question });
});
app.get('/ask', function (req, res) {
    res.render('ask', { title: 'fuck', data: ['cats', 'dogs', 'bird'] });
});
app.get('/ask/:question', function (req, res) {
    db.insertQuestion(req.params.question, "100a", function (question) {
        res.redirect('/ask');
    });
});
app.get('/question', function (req, res) {
    res.render('question', { title: 'fuck', data: ['cats', 'dogs', 'bird'] });
});
app.get('/answer', function (req, res) {
    res.render('answer', { title: 'fuck', data: ['cats', 'dogs', 'bird'] });
});
module.exports = app;
