import * as mongodb from "mongodb";

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('db', server, {w: 1});

db.open(() => {});

export interface Question {
	_id: mongodb.ObjectID;;
	qtext: string;
	userId: string;
	date: Date;
	votes: number;	
}

export interface Answer {
	_id: mongodb.ObjectID;;
	atext: string;
	qId: string;
	date: Date;
}

export function insertQuestion(text : string, userId : string, callback: (question : Question) => void) {		
	db.collection('questions', (error, result) => {
		if(error) {console.error(error); return; }
		result.insert({
			"text" : text,
			"user_id" : userId,
			"date" : new Date(),
			"votes" : 0
		}, (error, question) => {
			if(error) {console.error(error); return; }
			callback(question);
		});
	});
};

export function getQuestions(res, callback) {
   db.collection('questions').find().toArray((error, items) => {
		if(error) {console.error(error); return; }
		callback(items);
   });
};