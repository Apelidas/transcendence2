
document.getElementById('startPongPvp').addEventListener('click', () => {
    const left_player = create_player("leftPlayerName", "leftPlayerColor");
    const right_player = create_player("rightPlayerName", "rightPlayerColor");
    start_pong_game(left_player, right_player);
});
