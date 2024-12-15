document.getElementById("ai-startTTTGame").addEventListener("click", () => {
    const player1 = document.getElementById("aiPlayerName").value.trim();
    const errorMessage = document.getElementById("ai-error-message");

    if (!validateNameTTT(player1)) {
        errorMessage.textContent = "Invalid name. Please enter a valid name.";
        errorMessage.style.display = "block";
        return false;
    }

    errorMessage.style.display = "none"; // Hide error if validation passes
    start_ttt_ai_game(player1);
});

function start_ttt_ai_game(player1) {
    // Hide the Start button and show the game board
    document.getElementById("ai-startTTTGame").style.display = "none";

    // Show the game board container and hide "Choose who starts"
    const gameBoardContainer = document.getElementById("ai-TTTGameBoard");
    gameBoardContainer.style.display = "flex";
    document.getElementById("whoStartsContainer").style.display = "none";

    // Disable the player name input
    document.getElementById("aiPlayerName").disabled = true;

    // Get who starts (Player or AI)
    const whoStarts = document.getElementById("whoStarts").value;

    // Initialize the game state and game board
    const aiGameBoard = document.getElementById("ai-game-board");
    const statusDisplay = document.getElementById("ai-status");
    const resetButton = document.getElementById("ai-reset");
    const giveUpButton = document.getElementById("ai-give-up");
    const newGameButton = document.getElementById("new-game-button");

    let currentPlayer = whoStarts === "player" ? "X" : "O";
    let gameState = Array(9).fill("");
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const createBoard = () => {
        gameState = Array(9).fill(""); // Reset game state
        gameActive = true;
		enableGiveUpButton(); // Re-enable the give up button
        currentPlayer = whoStarts === "player" ? "X" : "O";
        updateStatusDisplay(currentPlayer);

        aiGameBoard.innerHTML = ""; // Clear the board container
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("ai-cell");
            cell.setAttribute("data-index", i);
            cell.addEventListener("click", handleCellClick);
            aiGameBoard.appendChild(cell);
        }

        if (currentPlayer === "O") {
            aiMove(); // AI makes the first move if it starts
        }
    };

    const updateStatusDisplay = (currentPlayer) => {
        statusDisplay.textContent = currentPlayer === "X" ? "Your turn as X" : "AI's turn";
        statusDisplay.style.color = currentPlayer === "X" ? "blue" : "red";
    };

    const handleCellClick = (event) => {
        if (!gameActive || currentPlayer !== "X") return;

        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute("data-index"));

        if (gameState[cellIndex]) {
            statusDisplay.textContent = "Cell already taken!";
            return;
        }

        gameState[cellIndex] = "X";
        cell.textContent = "X";
        cell.classList.add("taken");

        const winner = checkWinner();
        if (winner) {
            displayWinner(winner);
        } else {
            currentPlayer = "O";
            updateStatusDisplay(currentPlayer);
            aiMove();
        }
    };

    const aiMove = () => {
        if (!gameActive) return;

        // Improved AI logic
        const preventWinMove = getBestMove([...gameState], "X"); // Look for player's winning move
        const aiWinningMove = getBestMove([...gameState], "O"); // Look for AI's winning move

        let bestMoveIndex;
        if (aiWinningMove) {
            bestMoveIndex = aiWinningMove;
        } else if (preventWinMove && Math.random() < 0.9) {
            bestMoveIndex = preventWinMove; // 90% chance to block player
        } else {
            bestMoveIndex = getRandomMove([...gameState]); // Fallback to random move
        }

        if (bestMoveIndex !== null) {
            gameState[bestMoveIndex] = "O";

            const cell = document.querySelector(`[data-index="${bestMoveIndex}"]`);
            cell.textContent = "O";
            cell.classList.add("taken");

            const winner = checkWinner();
            if (winner) {
                displayWinner(winner);
            } else {
                currentPlayer = "X";
                updateStatusDisplay(currentPlayer);
            }
        }
    };

    const getBestMove = (board, player) => {
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            const line = [board[a], board[b], board[c]];

            if (
                line.filter((cell) => cell === player).length === 2 &&
                line.includes("")
            ) {
                return condition[line.indexOf("")]; // Return the index to complete/block a win
            }
        }
        return null; // No immediate winning or blocking move
    };

    const getRandomMove = (board) => {
        const availableMoves = board
            .map((cell, index) => (cell === "" ? index : null))
            .filter((index) => index !== null);

        if (availableMoves.length > 0) {
            return availableMoves[Math.floor(Math.random() * availableMoves.length)];
        }
        return null;
    };

    const checkWinner = () => {
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (
                gameState[a] &&
                gameState[a] === gameState[b] &&
                gameState[a] === gameState[c]
            ) {
                return gameState[a];
            }
        }

        return gameState.includes("") ? null : "Tie";
    };

	const displayWinner = (winner) =>{
        sendTTTData(winner,  player1, 'AI');
		gameActive = false;
		giveUpButton.disabled = true; // Disable the give up button
		if (winner === "Tie") {
			statusDisplay.textContent = "It's a tie!";
		} else {
			statusDisplay.textContent = `Player ${winner} wins!`;
		}
	};
	
	// Enable the give up button when the game starts
	const enableGiveUpButton = () => {
		giveUpButton.disabled = false;
	};

    resetButton.addEventListener("click", () => {
        createBoard(); // Reset the board
    });

    giveUpButton.addEventListener("click", () => {
        if (gameActive) {
            gameActive = false;
            statusDisplay.textContent = "You gave up! AI wins!";
        }
    });

    newGameButton.addEventListener("click", () => {
        document.getElementById("aiPlayerName").disabled = false;
        document.getElementById("ai-startTTTGame").style.display = "block";
        document.getElementById("whoStartsContainer").style.display = "block";
        gameBoardContainer.style.display = "none";
        statusDisplay.textContent = "Your turn as X";
    });

    createBoard(); // Initialize the board immediately
}
