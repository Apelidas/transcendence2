
document.getElementById('startPongPvp').addEventListener('click', () => {

    pongSettings.type = "pvp";
    pongSettings.winningScore = document.getElementById('winningScorePvp').value;
    pongSettings.backgroundColor = document.getElementById('backgroundColor').value;
    pongSettings.ballColor = document.getElementById('ballColor').value;

    const left_player = create_player("leftPlayerName", "leftPlayerColor");
    if (!left_player)
        return ;
    const right_player = create_player("rightPlayerName", "rightPlayerColor");
    if (!right_player)
        return ;
    

	if (validateName(left_player.name) && validateName(right_player.name)) {
		// Check if names are unique
		if (String(left_player.name || "").toLowerCase() === String(right_player.name || "").toLowerCase()) {
			alert("Please use different names, even though you want to be the same person.");
			return;
		}	
		// All checks passed, start the game
		start_pong_game(left_player, right_player);
	} else {
		//alert("One or both player names are invalid. Please ensure names are at least 3 characters long.");
		return;
	}
});
