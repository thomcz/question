function routeTo(route : string) {
	window.location.href = route;
}

function sendQuestion(userid : string) {
	var textarea: HTMLElement = document.getElementById('question-text');
	var text: string = textarea.innerHTML;
	window.location.href = '/ask/' + userid + '/' + text;
}

function sendAnswer(qid : string, userid : string) {
	var textarea: HTMLElement = document.getElementById('answer-text');
	var text: string = textarea.innerHTML;
	window.location.href = '/answering/' + userid + '/' + qid + '/' + text;
}

function openMyQuestion(question_id : string) {
	window.location.href = '/myquestion/' + question_id;
}