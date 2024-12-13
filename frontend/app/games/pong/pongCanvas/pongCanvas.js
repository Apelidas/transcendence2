
let pong_finalist_1 = "";
let pong_finalist_2 = "";
let pong_winner = "";

function start_pong_game(left_player, right_player, settings) {

    changeRoute('/games/pong/pongCanvas')

    const canvas = document.getElementById('pongCanvas');
    const context = canvas.getContext('2d');
    const gameOverlay = document.getElementById('gameOverlay');
    const backgroundColorInput = document.getElementById('backgroundColor');
    const ballColorInput = document.getElementById('ballColor');
    const decreaseSpeedButton = document.getElementById('decreaseSpeed');
    const increaseSpeedButton = document.getElementById('increaseSpeed');
    const decreaseSizeButton = document.getElementById('decreaseSize');
    const increaseSizeButton = document.getElementById('increaseSize');
    const toggleObstaclesButton = document.getElementById('toggleObstacles');
    const leftGiveUp = document.getElementById('left-give-up');
    const rightGiveUp = document.getElementById('right-give-up');
    const giveUpButtons = document.querySelectorAll('.give-up-button');

	// Apply settings for game initialization
	function applySettings() {
		canvas.width = 600;
		canvas.height = 400;
		canvas.style.backgroundColor = backgroundColorInput ? backgroundColorInput.value : '#222'; // Add fallback
		ball.color = ballColorInput ? ballColorInput.value : '#FFFFFF';
		playerLeft.color = left_player.color ? left_player.color : '#FF0000';
		playerRight.color = right_player.color ? right_player.color : '#0000FF';
		playerLeft.name = left_player.name ?  left_player.name : 'Left Player';
		document.getElementById("leftPlayerNameDisplay").innerHTML = playerLeft.name;
		playerRight.name = right_player.name ? right_player.name : 'Right Player';
		document.getElementById("rightPlayerNameDisplay").innerHTML = playerRight.name;
		winningScore = parseInt(settings.winningScore ? settings.winningScore : 11);
	}

    let ballSpeed = 3;
    let ballSize = 10;
    let obstaclesEnabled = false;
    let gameRunning = false;
    let winningScore = 11;
    let obstacles = [];
	

    let ball = {
        x: canvas.width,
        y: canvas.height / 2,
        dx: 4,
        dy: -4,
        speed: ballSpeed,
        radius: ballSize,
        color: '#FFFFFF'
    };
    let playerLeft = {x: 10, y: canvas.height / 2 - 50, width: 10, height: 100, dy: 0, score: 0, color: '#FF0000'};
    let playerRight = {
        x: canvas.width * 2 - 20,
        y: canvas.height / 2 - 50,
        width: 10,
        height: 100,
        dy: 0,
        score: 0,
        color: '#0000FF'
    };



	// Code that executes
	if (validateName(left_player.name) && validateName(right_player.name) && checkForUniqueNames([left_player.name, right_player.name])) {
		applySettings();
		gameOverlay.style.display = 'flex';
		giveUpButtons.forEach(button => button.style.display = 'block');
		gameRunning = true;
		resetBall();
		if (obstaclesEnabled)
			createObstacles();
		requestAnimationFrame(update_game);
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
        // TODO move to correct page after game
        if (winner) {
            alert(`${winner} wins!`);
            sendGameData(leftScore, rightScore);
            if (settings.type === 'pong_semi_1') {
                pong_finalist_1 = winner;
                changeRoute('/games/pong/pongBracket');
                display_bracket(players);
            }
            else if (settings.type === 'pong_semi_2') {
                pong_finalist_2 = winner;
                changeRoute('/games/pong/pongBracket');
                display_bracket(players);
            }
            else if (settings.type === 'pong_finals') {
                pong_winner = winner;
                changeRoute('/games/pong/pongBracket');
                display_bracket(players);
            }
        }
        gameRunning = false;
        gameOverlay.style.display = 'none';
        resetScore();
        resetBallsChanges();
        giveUpButtons.forEach(button => button.style.display = 'none');
        if (obstaclesEnabled)
            obstacles = [];
    }

    async function sendGameData(leftScore, rightScore) {
        const response = await sendGame(leftScore, rightScore, false, true, leftScore > rightScore);
        if (response.status !== 200) {
            alert('There has been an error. GameData could not be stored');
        }
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

        if (ball.x + ball.radius < 0) {
            playerRight.score++;
            resetBall();
        } else if (ball.x - ball.radius > canvas.width) {
            playerLeft.score++;
            resetBall();
        }

        if (playerLeft.score >= winningScore || playerRight.score >= winningScore) {
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
		const speed = ball.speed || 3;
	
		// Set the ball's velocity
		ball.dx = Math.cos(angle) * speed;
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
        if (obstaclesEnabled)
            createObstacles();
        else
            obstacles = [];
    });

    // Apply a random effect when the ball hits an obstacle
    function applyRandomEffect() {
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
        if (gameRunning) {
            movePaddles();
			// Update AI paddle only in AI mode
			if (settings.type === "ai") {
				updateAI(ball, playerRight, canvas.height);
			}			
            moveBall();
            checkObstacleCollision();
            draw();
            requestAnimationFrame(update_game);
        }
    }


    increaseSpeedButton.addEventListener('click', () => {
        if (!gameOnPause())
            ball.speed++;
    });

    decreaseSpeedButton.addEventListener('click', () => {
        if (ball.speed > 1 && !gameOnPause())
            ball.speed--;
    });

    increaseSizeButton.addEventListener('click', () => {
        if (!gameOnPause())
            ball.radius += 2;
    });

    decreaseSizeButton.addEventListener('click', () => {
        if (ball.radius > 2 && !gameOnPause())
            ball.radius -= 2;
    });

    leftGiveUp.addEventListener('click', () => {
        endGame(playerRight.name);
    });

    rightGiveUp.addEventListener('click', () => {
        endGame(playerLeft.name);
    });

    // Handle user keyboard inputs for paddle control
    document.addEventListener('keydown', (e) => {
        if (!gameOnPause()) {
            if (e.key === 'w') playerLeft.dy = -5;
            if (e.key === 's') playerLeft.dy = 5;
            if (e.key === 'ArrowUp') playerRight.dy = -5;
            if (e.key === 'ArrowDown') playerRight.dy = 5;
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === 'w' || e.key === 's') playerLeft.dy = 0;
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') playerRight.dy = 0;
        if (e.key === 'Escape') endGame()
        if (e.key === 'p') pauseGame();
    });

    function gameOnPause() {
        return ball.speed === 0;
    }

    function pauseGame() {
        if (!gameOnPause())
            ball.speed = 0
        else
            ball.speed = 4
    }

    window.addEventListener('popstate', function (event) {
        endGame();
    });
};
