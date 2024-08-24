const pongEndpoint = 'http://127.0.0.1:8000/pong/';


document.addEventListener('DOMContentLoaded', function () {
const canvas = document.getElementById('pongCanvas');
const context = canvas ? canvas.getContext('2d') : null;
const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const winnerMessage = document.getElementById('winnerMessage');
const leftGiveUpButton = document.getElementById('leftGiveUp');
const rightGiveUpButton = document.getElementById('rightGiveUp');
const ballSpeedSlider = document.getElementById('ballSpeed');
const controlsContainer = document.getElementById('controlsContainer');

// Game constants
const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;
const playerSpeed = 6;
const aiSpeed = 4;
const winningScore = 11;
const missChance = 0.01; // 1% chance for the AI to miss the ball
const scoreMargin = 50; // Margin for score from the top
const nameMargin = 50; // Margin for name from the bottom

// Customization options
let backgroundColor = '#000000';
let ballColor = '#FFFFFF';
let leftPlayerColor = '#FF0000';
let rightPlayerColor = '#0000FF';

// Player names
let leftPlayerName = 'Player';
let rightPlayerName = 'Player 2';
let isAI = false; // Flag to determine if AI is active
let gameRunning = true; // Flag to control the game loop

// Player paddle (left)
const playerLeft = {
    x: 0,
    y: canvas ? canvas.height / 2 - paddleHeight / 2 : 0,
    width: paddleWidth,
    height: paddleHeight,
    color: leftPlayerColor,
    dy: 0,
    score: 0
};

// Opponent paddle (right)
const playerRight = {
    x: canvas ? canvas.width - paddleWidth : 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: rightPlayerColor,
    dy: 0,
    score: 0
};

// Ball
const ball = {
    x: canvas ? canvas.width / 2 : 0,
    y: canvas ? canvas.height / 2 : 0,
    radius: ballRadius,
    speed: parseInt(ballSpeedSlider.value, 10),
    dx: 4,
    dy: -4,
    color: ballColor
};

// AI update interval
let lastAIUpdateTime = 0;
const aiUpdateInterval = 1000; // 1 second

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

// Draw text (scores and names)
function drawText(text, x, y, color, align = 'center') {
    context.fillStyle = color;
    context.font = '35px Arial';
    context.textAlign = align;
    context.fillText(text, x, y);
}

// Draw net
function drawNet() {
    for (let i = 0; i < canvas.height; i += 15) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, '#fff');
    }
}

// Create a gradient color
function createGradient(color1, color2) {
    const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}

// Draw everything
function draw() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set the background color
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw net
    drawNet();

    // Draw paddles
    drawRect(playerLeft.x, playerLeft.y, playerLeft.width, playerLeft.height, playerLeft.color);
    drawRect(playerRight.x, playerRight.y, playerRight.width, playerRight.height, playerRight.color);

    // Draw ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);

    // Create gradients for scores and names
    const leftGradient = createGradient(playerLeft.color, 'white');
    const rightGradient = createGradient('white', playerRight.color);

    // Draw scores
    drawText(playerLeft.score, canvas.width / 4, scoreMargin, leftGradient);
    drawText(playerRight.score, 3 * canvas.width / 4, scoreMargin, rightGradient);

    // Draw player names (mirroring the score positions)
    drawText(leftPlayerName, canvas.width / 4, canvas.height - nameMargin, leftGradient);
    drawText(rightPlayerName, 3 * canvas.width / 4, canvas.height - nameMargin, rightGradient);
}

// Move paddles
function movePaddles() {
    playerLeft.y += playerLeft.dy;

    // AI movement
    if (isAI) {
        const currentTime = Date.now();
        if (currentTime - lastAIUpdateTime >= aiUpdateInterval) {
            if (Math.random() > missChance) {
                if (ball.y < playerRight.y + playerRight.height / 2) {
                    playerRight.dy = -aiSpeed;
                } else if (ball.y > playerRight.y + playerRight.height / 2) {
                    playerRight.dy = aiSpeed;
                } else {
                    playerRight.dy = 0;
                }
            } else {
                // Introduce a random move to simulate a miss
                playerRight.dy = Math.random() > 0.5 ? aiSpeed : -aiSpeed;
            }
            lastAIUpdateTime = currentTime;
        }
    }

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

    // Adjust ball speed based on slider
    ball.speed = parseInt(ballSpeedSlider.value, 10);
    ball.dx = ball.speed * Math.sign(ball.dx);
    ball.dy = ball.speed * Math.sign(ball.dy);

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
    ball.dx = ball.speed * Math.sign(ball.dx);
}

// End game
function endGame() {
    // Display winner
    const winner = playerLeft.score >= winningScore ? `${leftPlayerName} Wins!` : `${rightPlayerName} Wins!`;
    winnerMessage.textContent = winner;
    winnerMessage.style.color = playerLeft.score >= winningScore ? playerLeft.color : playerRight.color;
    overlay.style.display = 'flex';
    popup.style.display = 'block';
    gameRunning = false; // Stop the game loop
    document.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('keyup', keyUpHandler);
}

// Give up function
function giveUp(player) {
    const winner = player === 'left' ? `${rightPlayerName} Wins!` : `${leftPlayerName} Wins!`;
    winnerMessage.textContent = winner;
    winnerMessage.style.color = player === 'left' ? playerRight.color : playerLeft.color;
    overlay.style.display = 'flex';
    popup.style.display = 'block';
    gameRunning = false; // Stop the game loop
    document.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('keyup', keyUpHandler);
}

// Restart game
function restartGame() {
    playerLeft.score = 0;
    playerRight.score = 0;
    resetBall();
    gameRunning = true; // Restart the game loop
    overlay.style.display = 'none';
    popup.style.display = 'none';
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    requestAnimationFrame(gameLoop);
}

// Start game
function startGame() {
	event.preventDefault();  // Prevent default link behavior
    const leftNameInput = document.getElementById('leftPlayerName').value.trim();
    const rightNameInput = document.getElementById('rightPlayerName').value.trim();

    if (leftNameInput === rightNameInput) {
        alert('Player names must be different!');
        return;
    }

    leftPlayerName = leftNameInput || 'Player';
    rightPlayerName = rightNameInput || 'Player 2';
    isAI = rightNameInput === 'AI-ko';

    // Get customization options
    backgroundColor = document.getElementById('backgroundColor').value;
    ballColor = document.getElementById('ballColor').value;
    leftPlayerColor = document.getElementById('leftPlayerColor').value;
    rightPlayerColor = document.getElementById('rightPlayerColor').value;

    // Update player and ball colors
    playerLeft.color = leftPlayerColor;
    playerRight.color = rightPlayerColor;
    ball.color = ballColor;

    // Set button colors
    leftGiveUpButton.style.color = leftPlayerColor;
    rightGiveUpButton.style.color = rightPlayerColor;

    document.getElementById('startScreen').style.display = 'none';
    canvas.style.display = 'block';
    controlsContainer.style.display = 'flex';
    leftGiveUpButton.style.display = 'block';
    rightGiveUpButton.style.display = 'block';
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    gameRunning = true;
    requestAnimationFrame(gameLoop);
}

// Attach start button event listener
document.getElementById('startButton').addEventListener('click', startGame);

// Handle color input change
function handleColorChange(event) {
    const input = event.target;
    const color = input.value;
    input.style.backgroundColor = color;
}

// Attach color change handler to color inputs
document.querySelectorAll('input[type="color"]').forEach(input => {
    input.addEventListener('change', handleColorChange);
    input.addEventListener('input', handleColorChange);
});

// Game loop
function gameLoop() {
    if (!gameRunning) return; // Exit the loop if the game is not running
    movePaddles();
    moveBall();
    draw();
    requestAnimationFrame(gameLoop);
}

// Event listeners for player paddles
function keyDownHandler(e) {
    switch(e.key) {
        case 'w':
            playerLeft.dy = -playerSpeed;
            break;
        case 's':
            playerLeft.dy = playerSpeed;
            break;
        case 'ArrowUp':
            if (!isAI) playerRight.dy = -playerSpeed;
            break;
        case 'ArrowDown':
            if (!isAI) playerRight.dy = playerSpeed;
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
            if (!isAI) playerRight.dy = 0;
            break;
    }
}
});