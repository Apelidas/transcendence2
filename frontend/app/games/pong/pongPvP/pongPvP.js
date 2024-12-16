
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
    
    // Validate names
    if (!validateName(left_player.name)) {
       return; // Do not proceed if validation fails
    }
    else if (!validateName(right_player.name)) {
        return; // Do not proceed if validation fails
    }

    // console.log(left_player.name)
    // console.log(right_player.name)
    if(left_player.name === right_player.name) {
        alert("Please use different names, even tho you want to be the same person")
        return;
    }

    if (!checkForUniqueNames([left_player.name, right_player.name])) {
        return; // Do not proceed if names are not unique
    }

    start_pong_game(left_player, right_player);
});
