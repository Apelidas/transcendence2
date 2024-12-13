document.getElementById('ticTacToePvpButton').addEventListener('click', function() {

    document.getElementById("startTTTGame").style.display = "inline";
	document.getElementById("TTTGameBoard").style.display = "none";
    changeRoute('/games/ticTacToe/ticTacToePvP'); 
});

document.getElementById('ticTacToeAiButton').addEventListener('click', function() {
    changeRoute('/games/ticTacToe/ticTacToeAI'); 
	document.dispatchEvent(new Event("startTTTai"));
});

document.getElementById('ticTacToeTournButton').addEventListener('click', function() {
    changeRoute('/games/ticTacToe/ticTacToeTourn');
	document.dispatchEvent(new Event("startTTTtourn"));
});