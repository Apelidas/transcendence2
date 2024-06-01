const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

// Game constants
const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;
const playerSpeed = 6;

// Player paddle
const player = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#fff',
    dy: 0
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
    drawRect(player.x, player.y, player.width, player.height, player.color);
    
    // Draw ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// Move paddles
function movePaddles() {
    player.y += player.dy;

    // Prevent paddles from going out of bounds
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
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
    if (ball.x - ball.radius < player.x + player.width &&
        ball.y > player.y && ball.y < player.y + player.height) {
        ball.dx *= -1;
    }

    // Reset ball if it goes off screen
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        resetBall();
    }
}

// Reset ball to center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
}

// Game loop
function gameLoop() {
    movePaddles();
    moveBall();
    draw();
    requestAnimationFrame(gameLoop);
}

// Event listeners for player paddle
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp') {
        player.dy = -playerSpeed;
    } else if (e.key === 'ArrowDown') {
        player.dy = playerSpeed;
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        player.dy = 0;
    }
});

// Start game loop
gameLoop();
