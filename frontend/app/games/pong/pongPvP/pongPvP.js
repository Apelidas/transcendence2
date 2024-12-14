
document.getElementById('startPongPvp').addEventListener('click', () => {
    const left_player = create_player("leftPlayerName", "leftPlayerColor");
    if (!left_player)
        return ;
    const right_player = create_player("rightPlayerName", "rightPlayerColor");
    if (!right_player)
        return ;

    const leftPlayerName = document.getElementById("leftPlayerName").value;
    const rightPlayerName = document.getElementById("rightPlayerName").value;
    
    // Validate names
    if (!validateName(leftPlayerName)) {
       return; // Do not proceed if validation fails
   }

   if (!checkForUniqueNames([leftPlayerName, rightPlayerName])) {
       return; // Do not proceed if names are not unique
   }
    pongSettings.type = "pvp";
    pongSettings.winningScore = document.getElementById('winningScorePvp').value;
    
    start_pong_game(left_player, right_player, pongSettings);
});

