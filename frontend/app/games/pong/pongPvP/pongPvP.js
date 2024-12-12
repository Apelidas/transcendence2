
document.getElementById('startPongPvp').addEventListener('click', () => {
    changeRoute('/games/pong/pongCanvas')
    start_pong_game();
});
