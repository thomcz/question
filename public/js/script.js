function routeTo(route) {
    window.location.href = route;
}
function sendQuestion() {
    var textarea = document.getElementById('question-text');
    var text = textarea.innerHTML;
    window.location.href = '/ask/' + text;
}
