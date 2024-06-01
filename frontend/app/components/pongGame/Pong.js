const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');
const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const winnerMessage = document.getElementById('winnerMessage');

// Game constants
const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;
const playerSpeed = 6;
const winningScore = 11;

// Player paddle (left)
const playerLeft = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#FF0000', // Red color for left player
    dy: 0,
    score: 0
};

// Opponent paddle (right)
const playerRight = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#0000FF', // Blue color for right player
    dy: 0,
    score: 0
};

// Ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballRadius,
    speed: 4,
    dx: 4,
    dy: -4,
    color: '#fff'
};

// Draw rectangle (paddles)
function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

// Draw circle (ball)
function drawCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

// Draw text (scores)
function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = '35px Arial';
    context.fillText(text, x, y);
}

// Draw net
function drawNet() {
    for (let i = 0; i < canvas.height; i += 15) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, '#fff');
    }
}

// Draw everything
function draw() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw net
    drawNet();
    
    // Draw paddles
    drawRect(playerLeft.x, playerLeft.y, playerLeft.width, playerLeft.height, playerLeft.color);
    drawRect(playerRight.x, playerRight.y, playerRight.width, playerRight.height, playerRight.color);
    
    // Draw ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);

    // Draw scores
    drawText(playerLeft.score, canvas.width / 4, canvas.height / 5, playerLeft.color);
    drawText(playerRight.score, 3 * canvas.width / 4, canvas.height / 5, playerRight.color);
}

// Move paddles
function movePaddles() {
    playerLeft.y += playerLeft.dy;
    playerRight.y += playerRight.dy;

    // Prevent paddles from going out of bounds
    if (playerLeft.y < 0) playerLeft.y = 0;
    if (playerLeft.y + playerLeft.height > canvas.height) playerLeft.y = canvas.height - playerLeft.height;
    if (playerRight.y < 0) playerRight.y = 0;
    if (playerRight.y + playerRight.height > canvas.height) playerRight.y = canvas.height - playerRight.height;
}

// Move ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (top and bottom)
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Paddle collision
    if (ball.x - ball.radius < playerLeft.x + playerLeft.width &&
        ball.y > playerLeft.y && ball.y < playerLeft.y + playerLeft.height) {
        ball.dx *= -1;
    }

    if (ball.x + ball.radius > playerRight.x &&
        ball.y > playerRight.y && ball.y < playerRight.y + playerRight.height) {
        ball.dx *= -1;
    }

    // Check if a player scored
    if (ball.x - ball.radius < 0) {
        playerRight.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        playerLeft.score++;
        resetBall();
    }

    // Check for win condition
    if (playerLeft.score >= winningScore || playerRight.score >= winningScore) {
        endGame();
    }
}

// Reset ball to center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
}

// End game
function endGame() {
    // Display winner
    const winner = playerLeft.score >= winningScore ? 'Left Player Wins!' : 'Right Player Wins!';
    winnerMessage.textContent = winner;
    winnerMessage.style.color = playerLeft.score >= winningScore ? playerLeft.color : playerRight.color;
    overlay.style.display = 'flex';
    popup.style.display = 'block';
    document.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('keyup', keyUpHandler);
}

// Restart game
function restartGame() {
    playerLeft.score = 0;
    playerRight.score = 0;
    resetBall();
    overlay.style.display = 'none';
    popup.style.display = 'none';
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    requestAnimationFrame(gameLoop);
}

// Game loop
function gameLoop() {
    movePaddles();
    moveBall();
    draw();
    if (playerLeft.score < winningScore && playerRight.score < winningScore) {
        requestAnimationFrame(gameLoop);
    }
}

// Event listeners for player and opponent paddles
function keyDownHandler(e) {
    switch(e.key) {
        case 'w':
            playerLeft.dy = -playerSpeed;
            break;
        case 's':
            playerLeft.dy = playerSpeed;
            break;
        case 'ArrowUp':
            playerRight.dy = -playerSpeed;
            break;
        case 'ArrowDown':
            playerRight.dy = playerSpeed;
            break;
    }
}

function keyUpHandler(e) {
    switch(e.key) {
        case 'w':
        case 's':
            playerLeft.dy = 0;
            break;
        case 'ArrowUp':
        case 'ArrowDown':
            playerRight.dy = 0;
            break;
    }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

// Start game loop
gameLoop();
