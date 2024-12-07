document.getElementById('pongPvpButton').addEventListener('click', function() {
    const pongPvpEvent = new CustomEvent('pongPvp');
    document.dispatchEvent(pongPvpEvent);
    changeRoute('/games/pong/pongPvP'); 
});

document.getElementById('pongAiButton').addEventListener('click', function() {
    changeRoute('/games/pong/pongAI'); 
});

document.getElementById('pongTournButton').addEventListener('click', function() {
    changeRoute('/games/pong/pongTourn'); 
});