
document.getElementById("startTTTTournament").addEventListener('click', () => {

    document.getElementById("startTTTTournament").style.display = "none";
    document.getElementById("tttTournPlayer1Name").disabled = true;
	document.getElementById("tttTournPlayer2Name").disabled = true;
    document.getElementById("tttTournPlayer3Name").disabled = true;
	document.getElementById("tttTournPlayer4Name").disabled = true;
    const bracket = document.getElementById("ttt-tournament-bracket");
    bracket.style.display = 'grid';
});
