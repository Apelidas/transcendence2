document.getElementById('pongPvpButton').addEventListener('click', function() {
    changeRoute('/games/pong/pongPvP');
});

document.getElementById('pongAiButton').addEventListener('click', function() {
    changeRoute('/games/pong/pongAI');
	document.dispatchEvent(new Event("startPongAi")); 
});

document.getElementById('pongTournButton').addEventListener('click', function() {
    changeRoute('/games/pong/pongTourn');
	document.dispatchEvent(new Event("startPongTourn"));
});