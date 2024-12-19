const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');
const gameOverlay = document.getElementById('gameOverlay');
const decreaseSpeedButton = document.getElementById('decreaseSpeed');
const increaseSpeedButton = document.getElementById('increaseSpeed');
const decreaseSizeButton = document.getElementById('decreaseSize');
const increaseSizeButton = document.getElementById('increaseSize');
const toggleObstaclesButton = document.getElementById('toggleObstacles');
const leftGiveUp = document.getElementById('left-give-up');
const rightGiveUp = document.getElementById('right-give-up');
const ballColorInput = document.getElementById('ballColor');
const backgroundColorInput = document.getElementById('backgroundColor');
const giveUpButtons = document.querySelectorAll('.give-up-button');

let gamePaused = false; // Tracks whether the game is paused
let gameRunning = false;

let ballSpeed = 2;
let ballSize = 10;
let obstaclesEnabled = false;
let winningScore = 11;
let obstacles = [];

let ball = {};
let playerLeft = {};
let playerRight = {};

let animateFrame;

function start_pong_game(left_player, right_player) {

    changeRoute('/games/pong/pongCanvas');

    // These need to be set before player positions are calculated
    canvas.width = 600;
    canvas.height = 400;

    ballSpeed = 2;
    ballSize = 10;
    obstaclesEnabled = false;
    winningScore = 11;
    obstacles = [];

    playerLeft = {
        x: 10,
        y: canvas.height / 2 - 50,
        width: 10,
        height: 100,
        dy: 0,
        score: 0,
        color: left_player.color || '#FF0000',
    };
    playerRight = {
        x: canvas.width - 20,
        y: canvas.height / 2 - 50,
        width: 10,
        height: 100,
        dy: 0,
        score: 0,
        color: right_player.color || '#0000FF',
    };
    ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        dx: 4,
        dy: -4,
        speed: ballSpeed,
        radius: ballSize,
        color: ballColorInput ? ballColorInput.value : '#FFFFFF',
    };

    backgroundColorInput.addEventListener('input', debounce((event) => {
        const selectedColor = event.target.value;
        const ballColor = ball.color || '#FFFFFF'; // Use current ball color or default white

        if (!isContrastSufficient(ballColor, selectedColor)) {
            alert("The selected background color is too similar to the ball. Adjusting to a high-contrast color.");
            backgroundColorInput.value = '#000000'; // Reset to a safe, contrasting color
            canvas.style.backgroundColor = '#000000'; // Apply fallback color
        } else {
            canvas.style.backgroundColor = selectedColor; // Apply selected background color
        }
    }, 300));

    ballColorInput.addEventListener('input', debounce((event) => {
        const selectedColor = event.target.value;
        const bgComputedStyle = getComputedStyle(canvas);
        const backgroundColor = bgComputedStyle.backgroundColor;

        if (!isContrastSufficient(selectedColor, backgroundColor)) {
            alert("The selected ball color is too similar to the background. Adjusting to a high-contrast color.");
            ballColorInput.value = '##FFFFFF'; // Reset to a safe, contrasting color
        }
        ball.color = ballColorInput.value;
    }, 300));

    // Code that executes
    if (!left_player || !right_player) {
        return;
    }

    applySettings(left_player, right_player);
    gameOverlay.style.display = 'flex';
    giveUpButtons.forEach(button => button.style.display = 'block');
    gameRunning = true;
    gamePaused = false;
    obstaclesEnabled = false;
    resetBall();
    if (obstaclesEnabled)
        createObstacles();

    animateFrame = requestAnimationFrame(update_game);
}

// Helper function to debounce events
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Helper function to convert RGB color to luminance and to calculate it
function getRgbValues(color) {
    let r, g, b;

    if (color.startsWith('#')) {
        const bigint = parseInt(color.slice(1), 16);
        r = (bigint >> 16) & 255;
        g = (bigint >> 8) & 255;
        b = bigint & 255;
    } else if (color.startsWith('rgb')) {
        const rgb = color.match(/\d+/g).map(Number);
        [r, g, b] = rgb;
    } else {
        throw new Error(`Unsupported color format: ${color}`);
    }
    return [r, g, b];
}

// Helper function to calculate contrast ratio
function getContrastRatio(color1, color2) {
    const L1 = getRgbValues(color1);
    const L2 = getRgbValues(color2);
    return deltaE(L1, L2);
}

// Helper function to check contrast sufficiency
function isContrastSufficient(ballColor, backgroundColor, minRatio = 30) {
    try {
        const contrast = getContrastRatio(ballColor, backgroundColor);
        console.log(`Contrast ratio: ${contrast}`); // Debug output
        return contrast >= minRatio;
    } catch (error) {
        console.error(`Error calculating contrast: ${error.message}`);
        return false;
    }
}

function deltaE(rgbA, rgbB) {
    let labA = rgb2lab(rgbA);
    let labB = rgb2lab(rgbB);
    let deltaL = labA[0] - labB[0];
    let deltaA = labA[1] - labB[1];
    let deltaB = labA[2] - labB[2];
    let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
    let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
    let deltaC = c1 - c2;
    let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
    deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
    let sc = 1.0 + 0.045 * c1;
    let sh = 1.0 + 0.015 * c1;
    let deltaLKlsl = deltaL / (1.0);
    let deltaCkcsc = deltaC / (sc);
    let deltaHkhsh = deltaH / (sh);
    let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
    return i < 0 ? 0 : Math.sqrt(i);
}

function rgb2lab(rgb){
    let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
    x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
    y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
    z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}

// Apply settings for game initialization
function applySettings(left_player, right_player) {
    const defaultBallColor = '#FFFFFF'; // Default white ball
    const defaultBgColor = '#000000';     // Default black background

    // Apply background color
    let bgColor = pongSettings.backgroundColor || defaultBgColor;
    canvas.style.backgroundColor = bgColor;

    // Apply ball color
    let ballColor = pongSettings.ballColor || defaultBallColor;
    ball.color = ballColor;

    // Check contrast between ball and background
    if (!isContrastSufficient(ballColor, bgColor)) {
        console.warn(
            `Insufficient contrast between ball (${ballColor}) and background (${bgColor}). Adjusting colors.`
        );
        // Fallback logic: adjust background first, then ball color if needed
        if (!isContrastSufficient(defaultBallColor, bgColor)) {
            console.warn(`Default ball color also insufficient. Adjusting background to ${defaultBgColor}.`);
            bgColor = defaultBgColor;
            canvas.style.backgroundColor = bgColor;
        }
        ballColor = defaultBallColor; // Ensure ball is white
        ball.color = ballColor;
    }

    // Debugging output for color contrast adjustments
    console.log(`Final ball color: ${ball.color}, Final background color: ${canvas.style.backgroundColor}`);

    // Apply paddle colors
    playerLeft.color = left_player.color || '#FF0000';
    playerRight.color = right_player.color || '#0000FF';

    // Set player names
    playerLeft.name = left_player.name || 'Left Player';
    document.getElementById("leftPlayerNameDisplay").innerHTML = playerLeft.name;
    playerRight.name = right_player.name || 'Right Player';
    document.getElementById("rightPlayerNameDisplay").innerHTML = playerRight.name;

    // Set winning score
    winningScore = parseInt(pongSettings?.winningScore || 11);
}


//////////////////////////GAME////////////////////////////
//DRAWING
// Draw a paddle
function drawPaddle(player) {
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
}

// Draw the ball
function drawBall() {
    context.fillStyle = ball.color;
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
}

// Draw a dashed line in the center
function drawDashedLine() {
    context.setLineDash([10, 10]);
    context.strokeStyle = '#FFF';
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.stroke();
    context.setLineDash([]);
}

// Draw the scores for each player
function drawScores() {
    context.font = '36px Arial';
    context.fillStyle = '#FFF';
    context.textAlign = 'center';
    context.fillText(playerLeft.score, canvas.width / 4, 50);
    context.fillText(playerRight.score, (3 * canvas.width) / 4, 50);
}

// Drawing obstacles on the canvas
function drawObstacles() {
    context.fillStyle = '#FFD700'; // Gold color for obstacles
    obstacles.forEach(obstacle => {
        context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

//MOVING

// Move paddles based on user input
function movePaddles() {
    playerLeft.y += playerLeft.dy;
    playerRight.y += playerRight.dy;
    playerLeft.y = Math.max(0, Math.min(canvas.height - playerLeft.height, playerLeft.y));
    playerRight.y = Math.max(0, Math.min(canvas.height - playerRight.height, playerRight.y));
}

// End the game and display the winner
function endGame(winner, leftScore, rightScore) {
    gameRunning = false;
    cancelAnimationFrame(animateFrame);
    gameOverlay.style.display = 'none';
    if (winner){
        sendGameData(leftScore, rightScore, playerLeft.name, playerRight.name)
    }
    resetScore();
    resetBallsChanges();
    giveUpButtons.forEach(button => button.style.display = 'none');
    if (obstaclesEnabled)
        obstacles = [];
    return_to_page();
    if (winner) {
        alert(`${winner} wins!`);
        if (pongSettings.type === 'pong_semi_1') {
            pong_finalist_1 = winner;
            display_bracket(players);
        }
        else if (pongSettings.type === 'pong_semi_2') {
            pong_finalist_2 = winner;
            display_bracket(players);
        }
        else if (pongSettings.type === 'pong_finals') {
            pong_winner = winner;
            display_bracket(players);
            finishTournament(getCookie('tournamentId'), winner);
        }
    }
}

async function sendGameData(leftScore, rightScore, leftPlayer, rightPlayer) {
    try{
        const response = await sendGame(leftScore, rightScore, true, leftScore > rightScore, leftPlayer, rightPlayer);
        if (response.status !== 200) {
            alert('There has been an error. GameData could not be stored');
        }
    }catch(exception) {}
}

function resetBallsChanges() {
    ball.speed = ballSpeed;
    ball.radius = ballSize;
}

function resetScore() {
    playerLeft.score = 0;
    playerRight.score = 0;
}

// Move the ball and check for collisions
function moveBall() {
    ball.x += ball.dx * ball.speed;
    ball.y += ball.dy * ball.speed;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    if (ball.x - ball.radius < playerLeft.x + playerLeft.width &&
        ball.x > playerLeft.x &&
        ball.y + ball.radius > playerLeft.y &&
        ball.y - ball.radius < playerLeft.y + playerLeft.height) {

        // collision is from the top, bottom or side
        if (ball.y + ball.radius > playerLeft.y && ball.y - ball.radius < playerLeft.y + playerLeft.height) {

            // Adjust ball position to prevent sticking
            ball.x = playerLeft.x + playerLeft.width + ball.radius;
            ball.dx *= -1;
        } else
            ball.dy *= -1;

        if (obstaclesEnabled) checkObstacleCollision();
    }

    if (ball.x + ball.radius > playerRight.x &&
        ball.x < playerRight.x + playerRight.width &&
        ball.y + ball.radius > playerRight.y &&
        ball.y - ball.radius < playerRight.y + playerRight.height) {

        // collision is from the top, bottom or side
        if (ball.y + ball.radius > playerRight.y && ball.y - ball.radius < playerRight.y + playerRight.height) {

            // adjust ball position to prevent sticking
            ball.x = playerRight.x - ball.radius;
            ball.dx *= -1;
        } else
            ball.dy *= -1;

        if (obstaclesEnabled) checkObstacleCollision();
    }

    // console.log("DEBUG ball.x = " + ball.x + " ball.y = " + ball.y + " radius = " + ball.radius + " canvas-width = " + canvas.width);
    if (ball.x + ball.radius < 0) {
        playerRight.score++;
        // console.log("DEBUG Right player scored (" + playerRight.score + ")");
        resetBall();
    } else if (ball.x - ball.radius > canvas.width) {
        playerLeft.score++;
        // console.log("DEBUG Left player scored (" + playerLeft.score + ")");
        resetBall();
    }

    if (playerLeft.score >= winningScore || playerRight.score >= winningScore) {
        console.log("DEBUG End game by score");
        endGame(playerLeft.score > playerRight.score ? playerLeft.name : playerRight.name, playerLeft.score, playerRight.score);
    }
}

function resetBall() {
    // Set the ball to the center of the canvas
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    // Paddle and field dimensions
    const paddleDistance = canvas.width / 2 - 50; // Distance from center to paddle
    const maxVerticalDistance = canvas.height / 2; // Half the canvas height (for one bounce max)

    // Calculate maximum allowed angle for one bounce
    const maxBounceAngle = Math.atan(maxVerticalDistance / paddleDistance); // In radians
    const minAngle = 10 * Math.PI / 180; // Prevent too shallow angles

    let angle;

    // Randomize horizontal direction (left or right)
    const direction = Math.random() > 0.5 ? 1 : -1;

    // Generate angle based on horizontal direction
    if (direction === 1) {
        // Rightward ball: generate angle in lower-right or upper-right diagonal
        angle = Math.random() > 0.5
            ? Math.random() * (maxBounceAngle - minAngle) + minAngle // Lower-right
            : Math.PI - (Math.random() * (maxBounceAngle - minAngle) + minAngle); // Upper-right
    } else {
        // Leftward ball: generate angle in lower-left or upper-left diagonal
        angle = Math.random() > 0.5
            ? Math.PI + (Math.random() * (maxBounceAngle - minAngle) + minAngle) // Lower-left
            : 2 * Math.PI - (Math.random() * (maxBounceAngle - minAngle) + minAngle); // Upper-left
    }

    // Ensure the ball speed remains constant
    const speed = ball.speed || ballSpeed;

    // Set the ball's velocity
    ball.dx =  Math.cos(angle) * speed;
    ball.dy = Math.sin(angle) * speed;
}



//OBSTACLE FUNCTIONS

// Function to create four obstacles at random positions
function createObstacles() {
    obstacles = [];
    for (let i = 0; i < 4; i++) {
        const obstacle = {
            x: Math.floor(Math.random() * 500),
            y: Math.floor(Math.random() * 300),
            width: 15,
            height: 15
        };
        obstacles.push(obstacle);
    }
}

// Toggle obstacles on or off
toggleObstaclesButton.addEventListener('click', () => {
    obstaclesEnabled = !obstaclesEnabled;
    if (obstaclesEnabled && !isTournament())
        createObstacles();
    else
        obstacles = [];
});

// Apply a random effect when the ball hits an obstacle
function applyRandomEffect() {
    console.log("DEBUG Apply random effect");
    const effect = Math.floor(Math.random() * 3);
    switch (effect) {
        case 0: // Change direction
            ball.dx *= -1;
            ball.dy *= -1;
            break;
        case 1: // Change speed
            ball.speed = Math.random() * 3 + 2;
            break;
        case 2: // Change size
            ball.radius = Math.random() * 10 + 5;
            break;
    }
}

// Check collision between the ball and obstacles
function checkObstacleCollision() {
    obstacles.forEach(obstacle => {
        if (ball.x + ball.radius > obstacle.x &&
            ball.x - ball.radius < obstacle.x + obstacle.width &&
            ball.y + ball.radius > obstacle.y &&
            ball.y - ball.radius < obstacle.y + obstacle.height) {
            applyRandomEffect();
        }
    });
}

//MAIN
// Draw paddles, ball, and UI elements
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.backgroundColor = canvas.style.backgroundColor || pongSettings.backgroundColor || '#000000';

    drawPaddle(playerLeft);
    drawPaddle(playerRight);
    drawBall();
    drawDashedLine();
    drawScores();
    if (obstaclesEnabled)
        drawObstacles();
}

// Update game loop
function update_game() {

    if (!gameRunning) {
        console.log("DEBUG Stop update_game()");
        return ;
    }

    if (!gamePaused) {
        // Move human player paddles
        movePaddles();

        // Simulate AI behavior (only in AI mode)
        if (pongSettings.type === "ai") {
            updateAI(ball, playerRight, canvas.height, playerLeft);
            rightGiveUp.style.display = 'none'; // Hide the button
        }

        // Move the ball
        moveBall();

        // Check for collisions and draw the game state
        checkObstacleCollision();
        draw();
    }
    // Request the next frame
    requestAnimationFrame(update_game);
}

increaseSpeedButton.addEventListener('click', () => {
    if(!isTournament()){
        if (!gamePaused && ballSpeed < 4) {
            ballSpeed++;
            ball.speed = ballSpeed;
        }
    }
});

decreaseSpeedButton.addEventListener('click', () => {
    if(!isTournament()){
        if (ballSpeed > 1 && !gamePaused) {
            ballSpeed--;
            ball.speed = ballSpeed;
        }
    }
});

increaseSizeButton.addEventListener('click', () => {
    if(!isTournament()){
        if (!gamePaused && ball.radius < 20)
            ball.radius += 2;
    }
});

decreaseSizeButton.addEventListener('click', () => {
    if(!isTournament()){
        if (ball.radius > 2 && !gamePaused)
            ball.radius -= 2;
    }
});

leftGiveUp.addEventListener('click', () => {
    endGame(playerRight.name);
});

rightGiveUp.addEventListener('click', () => {
    endGame(playerLeft.name);
});

// Handle user keyboard inputs for paddle control
document.addEventListener('keydown', (e) => {
    if (gameRunning) {
        if (!gamePaused) {
            if (e.key === 'w') playerLeft.dy = -5;
            if (e.key === 's') playerLeft.dy = 5;
            if (e.key === 'ArrowUp') playerRight.dy = -5;
            if (e.key === 'ArrowDown') playerRight.dy = 5;
        }
        if (e.key === 'Escape') { endGame(); }
        if (e.key === 'p' || e.key === 'P') {
            gamePaused = !gamePaused; // Toggle the paused state
            ball.speed = gamePaused ? 0 : ballSpeed;
            if (gamePaused) {
                console.log("Game Paused");
            } else {
                console.log("Game Resumed");
            }
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 's') {
        playerLeft.dy = 0;
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        playerRight.dy = 0;
    }
});

function isTournament() {
    return pongSettings.type === 'pong_semi_1' || pongSettings.type === 'pong_semi_2' || pongSettings.type === 'pong_finals';
}

// window.addEventListener('popstate', function (event) {
//     endGame();
// });
