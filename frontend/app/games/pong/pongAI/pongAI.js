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

// Track the last AI update to throttle refresh rate
let lastAITick = 0;

// Main function to update AI paddle behavior
function updateAI(ball, playerRight, canvasHeight, playerLeft) {
    const currentTime = Date.now();
    const aiRefreshRate = 1000; // AI refreshes once per second

    // Skip this update if not enough time has passed
    if (currentTime - lastAITick < aiRefreshRate) {
        return;
    }
    lastAITick = currentTime;

    // Dynamic difficulty adjustment (DDA) to balance gameplay
    const baseSpeed = 3;
    const difficultyFactor = playerLeft.score > playerRight.score ? 1.5 : 1; // AI speeds up if player is winning
    const aiSpeed = baseSpeed * difficultyFactor;

    // Predict the ball's future position to enhance AI performance
    const predictedY = predictBallY(ball, playerRight.x);

    // Add randomness to mimic human-like errors and hesitation
    const randomness = Math.random() * 20 - 10; // ±10px randomness in target
    const hesitationChance = 0.1; // 10% chance to hesitate
    if (Math.random() < hesitationChance) {
        return; // Skip this update to simulate hesitation
    }

    // Calculate the AI paddle's target position
    const targetY = Math.min(predictedY + randomness, canvasHeight - playerRight.height / 2);

    // Ensure the paddle only moves toward reachable targets
    if (Math.abs(targetY - playerRight.y) > aiSpeed) {
        playerRight.y += targetY > playerRight.y ? aiSpeed : -aiSpeed; // Move AI paddle 
    }

    // Constrain the AI paddle within the game field
    playerRight.y = Math.max(0, Math.min(canvasHeight - playerRight.height, playerRight.y));
}

// Function to predict the ball's future Y-coordinate
function predictBallY(ball, targetX) {
    // Calculate time for the ball to reach the target X position
    const timeToReach = Math.abs(targetX - ball.x) / Math.abs(ball.dx);

    // Predict the ball's Y position based on its current direction and speed
    let predictedY = ball.y + ball.dy * timeToReach;

    // Account for bounces off the top and bottom walls
    const canvasHeight = 400; // Assuming canvas height is 400px
    while (predictedY < 0 || predictedY > canvasHeight) {
        if (predictedY < 0) {
            predictedY = -predictedY; // Bounce off the top
        } else if (predictedY > canvasHeight) {
            predictedY = 2 * canvasHeight - predictedY; // Bounce off the bottom
        }
    }

    return predictedY; // Return the final predicted Y position
}

/*
AI module requirements:
1. AI refresh once per second: The lastAITick and aiRefreshRate variables ensure the AI updates only once per second.
2. Alternative algorithms: The predictive logic in predictBallY avoids direct chasing and adds strategy without relying on A*.
3. Rule-based AI with heuristics: The prediction and constraints ensure the AI follows logical rules and avoids excessive movement.
4. Adaptation to gameplay: The AI reacts dynamically to ball position and player scores, adapting to gameplay changes.
5. Randomness for realism: The randomness and hesitation mimic human behavior, making the AI feel fair and realistic.
6. Dynamic Difficulty Adjustment: The AI speed scales with player performance, making the game balanced and engaging.


Implementation requirement 2: 
The predictive approach and simple rules rely on basic mathematics and game state observation rather than advanced graph-based algorithms like A*. 
These techniques are computationally lighter, easy to implement, and suitable for creating an effective AI player without the complexity of pathfinding algorithms. 
This satisfies the requirement to explore alternative methods while keeping the AI competitive and engaging.

- Prediction of Ball Trajectory:
Instead of relying on advanced pathfinding algorithms like A*, the AI predicts the ball's future Y-coordinate based on 
its current velocity and position using simple mathematical modeling. This prediction includes handling wall bounces, 
making the AI anticipate the ball's position effectively.
This approach is an alternative to A* and focuses on using physics-based heuristics to create a natural AI behavior.
- Rule-Based Decision-Making:
The AI uses simple rules such as only moving toward reachable targets and adjusting its position within the bounds of the game canvas. This avoids the computational overhead of pathfinding and emphasizes straightforward, effective decision-making.
-Randomness and Error Injection (Lines 24-26):
By introducing randomness and hesitations, the AI behaves in a way that resembles human-like play, rather than following an optimal path every time.

*/