document.getElementById('ticTacToePvpButton').addEventListener('click', function() {
    changeRoute('/games/ticTacToe/ticTacToePvP'); 
	document.dispatchEvent(new Event("startTTTpvp"));
});

document.getElementById('ticTacToeAiButton').addEventListener('click', function() {
    changeRoute('/games/ticTacToe/ticTacToeAI'); 
	document.dispatchEvent(new Event("startTTTai"));
});

document.getElementById('ticTacToeTournButton').addEventListener('click', function() {
    changeRoute('/games/ticTacToe/ticTacToeTourn');
	document.dispatchEvent(new Event("startTTTtourn"));
});