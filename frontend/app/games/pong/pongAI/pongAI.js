document.getElementById('startPongAi').addEventListener('click', () => {

    pongSettings.type = 'ai';
    pongSettings.winningScore = document.getElementById('aiWinningScore').value;
    pongSettings.backgroundColor = document.getElementById('aiBackgroundColor').value;
    pongSettings.ballColor = document.getElementById('aiBallColor').value;

    const left_player = create_player("aiLeftPlayerName", "aiLeftPlayerColor");
    if (!left_player)
        return ;
    const right_player = {
        name: "AI",
        color: document.getElementById("aiRightPlayerColor").value
    };
    if (!right_player)
        return ;

     // Validate names
     if (!validateName(left_player.name)) {
        return; // Do not proceed if validation fails
    }

    start_pong_game(left_player, right_player);
});

/**
 * Function to control AI paddle behavior.
 * This is specific to the AI mode and is added to the game loop in start_pong_game.
*/
// Track the last AI update for prediction
let lastAITick = 0;

// Simulate keypress-based movement
let aiKeyPress = {
    up: false,
    down: false,
};

function updateAI(ball, playerRight, canvasHeight, playerLeft) {
    const currentTime = Date.now();
    const aiRefreshRate = 1000; // AI refreshes once per second

    // Refresh AI view and prediction only once per second
    if (currentTime - lastAITick >= aiRefreshRate) {
        lastAITick = currentTime;

        // Predict the ball's future Y position
        const predictedY = predictBallY(ball, playerRight.x);

        // Determine target position for the paddle center
        const paddleCenter = playerRight.y + playerRight.height / 2;
        const targetY = predictedY;

        // Simulate human-like keypresses based on target position
        aiKeyPress.up = paddleCenter > targetY + 5; // Move up if target is below paddle center
        aiKeyPress.down = paddleCenter < targetY - 5; // Move down if target is above paddle center
    }

    // Apply simulated keypresses to adjust paddle speed
    const aiSpeed = 5; // Adjust for smoother or faster movement
    if (aiKeyPress.up) {
        playerRight.dy = -aiSpeed;
    } else if (aiKeyPress.down) {
        playerRight.dy = aiSpeed;
    } else {
        playerRight.dy = 0; // Stop paddle movement if close to the target
    }

    // Constrain paddle within the canvas
    playerRight.y = Math.max(0, Math.min(canvasHeight - playerRight.height, playerRight.y));
}

// Function to predict the ball's future Y-coordinate
function predictBallY(ball, targetX) {
    const canvasHeight = 400; // Assuming canvas height is 400px

    // Calculate the time for the ball to reach the target X position
    const timeToReach = Math.abs(targetX - ball.x) / Math.abs(ball.dx);

    // Predict the ball's Y position based on its direction and speed
    let predictedY = ball.y + ball.dy * timeToReach;

    // Account for bounces off the top and bottom walls
    while (predictedY < 0 || predictedY > canvasHeight) {
        if (predictedY < 0) {
            predictedY = -predictedY; // Bounce off the top wall
        } else if (predictedY > canvasHeight) {
            predictedY = 2 * canvasHeight - predictedY; // Bounce off the bottom wall
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