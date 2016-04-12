import * as mongodb from "mongodb";

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('db', server, {w: 1});

db.open(() => {});

export interface Question {
	_id: mongodb.ObjectID;;
	qtext: string;
	userid: string;
	date: Date;
	votes: number;	
	answers: number;
	random: number;
}

export interface Answer {
	_id: mongodb.ObjectID;;
	atext: string;
	qid: string;
	date: Date;
}

export function insertQuestion(text : string, userid : string, callback: (question : Question) => void) {		
	db.collection('questions', (error, result) => {
		if(error) {console.error(error); return; }
		result.insert({
			"text" : text,
			"user_id" : userid,
			"date" : new Date(),
			"votes" : 0,
			"answers" : 0,
			"random" : Math.random()
		}, (error, question) => {
			if(error) {console.error(error); return; }
			callback(question);
		});
	});
};

export function insertAnswer(qid : string, text : string, userid : string, callback: (answer : Answer) => void) {		
	db.collection('answers', (error, result) => {
		if(error) {console.error(error); return; }
		result.insert({
			"qid" : qid,
			"text" : text,
			"user_id" : userid,
			"date" : new Date()
		}, (error, answer) => {
			if(error) {console.error(error); return; }
			callback(answer);
		});
	});
};

export function getQuestion(qid : string, callback) {
   db.collection('questions').findOne({'_id': new mongodb.ObjectId(qid)}, (error, question) => {		
		if(error) {console.error(error); return; }
		/*console.log(qid + ":");
		console.log(question);*/
		callback(question);
   });
};

export function getAnswers(qid : string, callback) {
   db.collection('answers').find({'qid': qid}).toArray((error, answers) => {
		answers.forEach(function(entry) {
			console.log(entry);
		});
		
		if(error) {console.error(error); return; }
		callback(answers);
   });
};

export function getMyQuestions(userid, callback) {
   db.collection('questions').find({'user_id' : userid}).toArray((error, items) => {
		if(error) {console.error(error); return; }
		callback(items);
   });
};

export function getQuestions(userid, callback) {
	var result = db.collection('questions').find({'user_id' : {$nin: [userid]}, 'random' : {$gte: Math.random()}});
	if (result == null) {
		result = db.collection('questions').find({'user_id' : {$nin: [userid]}, 'random' : {$lte: Math.random()}});
	}
	result.limit(5).toArray((error, items) => {
		if(error) {console.error(error); return; }
		callback(items);
	});
};

export function removeQuestion(qid, callback) {
	db.collection('questions').deleteMany({'_id' : new mongodb.ObjectId(qid)}, (error, result) => {
		console.log(result);
		callback();
	});
}