
document.getElementById('startPongPvp').addEventListener('click', () => {
    const left_player = create_player("leftPlayerName", "leftPlayerColor");
    const right_player = create_player("rightPlayerName", "rightPlayerColor");
    const settings = {};
    settings.type = "pvp";
    settings.winningScore = document.getElementById('winningScorePvp').value;
    start_pong_game(left_player, right_player, settings);
});
