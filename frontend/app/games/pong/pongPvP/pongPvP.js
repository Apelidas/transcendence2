
document.getElementById('startPongPvp').addEventListener('click', () => {
    const left_player = create_player("leftPlayerName", "leftPlayerColor");
    if (!left_player)
        return ;
    const right_player = create_player("rightPlayerName", "rightPlayerColor");
    if (!right_player)
        return ;
    const settings = {};
    pongSettings.type = "pvp";
    pongSettings.winningScore = document.getElementById('winningScorePvp').value;
    
    start_pong_game(left_player, right_player, pongSettings);
});

