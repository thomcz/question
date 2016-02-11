function routeTo(route : string) {
	window.location.href = route;
}

function sendQuestion() {
	var textarea : HTMLElement = document.getElementById('question-text');
	var text : string = textarea.innerHTML;
	window.location.href = '/ask/' + text;
}

function openMyQuestion(object : Object) {
alert("id");
	window.location.href = '/myquestion/';
}