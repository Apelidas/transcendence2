document.getElementById('startPongAi').addEventListener('click', () => {
    const left_player = create_player("aiLeftPlayerName", "aiLeftPlayerColor");
    const right_player = {
        name: "AIko",
        color: document.getElementById("aiRightPlayerColor").value
    }; 
    const settings = {};
    settings.type = "ai";
    settings.winningScore = document.getElementById('aiWinningScore').value;
    settings.backgroundColor = document.getElementById('aiBackgroundColor').value;
    settings.ballColor = document.getElementById('aiBallColor').value;
    start_pong_game(left_player, right_player, settings);
});

/**
 * Function to control AI paddle behavior.
 * This is specific to the AI mode and is added to the game loop in start_pong_game.
 */
function updateAI(ball, playerRight, canvasHeight) {
    const aiSpeed = 3; // AI paddle speed
    const targetY = ball.y - playerRight.height / 2; // AI paddle target y-position

    if (Math.abs(targetY - playerRight.y) > aiSpeed) {
        // Move AI paddle toward the target
        playerRight.y += targetY > playerRight.y ? aiSpeed : -aiSpeed;
    }

    // Constrain the AI paddle to stay within the canvas
    playerRight.y = Math.max(0, Math.min(canvasHeight - playerRight.height, playerRight.y));
}
