document.addEventListener('DOMContentLoaded', function () {
    (function() {
        function updateAI(aiPlayer, ball) {
            const aiSpeed = 4;
            const missChance = 0.01;

            const aiCenter = aiPlayer.y + aiPlayer.height / 2;
            const ballDirection = ball.y - aiCenter;

            aiPlayer.dy = Math.random() > missChance ? (ballDirection > 0 ? aiSpeed : -aiSpeed) : (Math.random() > 0.5 ? aiSpeed : -aiSpeed);

            aiPlayer.y += aiPlayer.dy;

            // Prevent the AI paddle from going out of bounds
            if (aiPlayer.y < 0) aiPlayer.y = 0;
            if (aiPlayer.y + aiPlayer.height > canvas.height) aiPlayer.y = canvas.height - aiPlayer.height;
        }

        document.getElementById('startButton').addEventListener('click', function() {
            const leftName = document.getElementById('leftPlayerName').value.trim();

            window.startGame(false, leftName, 'AI-ko'); // Start with AI, using the core logic from pong.js
        });
    })();
});
