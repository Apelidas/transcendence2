document.getElementById('ticTacToePvpButton').addEventListener('click', function() {

    document.getElementById("tttPlayer1Name").disabled = false;
	document.getElementById("tttPlayer2Name").disabled = false;
    document.getElementById("startTTTGame").style.display = "inline";
	document.getElementById("TTTGameBoard").style.display = "none";
    changeRoute('/games/ticTacToe/ticTacToePvP'); 
});

document.getElementById('ticTacToeAiButton').addEventListener('click', function() {
    changeRoute('/games/ticTacToe/ticTacToeAI'); 
	document.dispatchEvent(new Event("startTTTai"));
});

document.getElementById('ticTacToeTournButton').addEventListener('click', function() {
    
    document.getElementById("tttTournPlayer1Name").disabled = false;
	document.getElementById("tttTournPlayer2Name").disabled = false;
    document.getElementById("tttTournPlayer3Name").disabled = false;
	document.getElementById("tttTournPlayer4Name").disabled = false;
});