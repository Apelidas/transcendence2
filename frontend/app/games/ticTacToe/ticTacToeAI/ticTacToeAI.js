
let aiPlayerSymbol = "";

document.getElementById("ai-startTTTGame").addEventListener("click", () => {
    const player1 = document.getElementById("aiPlayerName").value.trim();
    aiPlayerSymbol = document.getElementById("aiPlayerSymbol").value;
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
    // Hide the Start button and "Who starts" dropdown
    document.getElementById("ai-startTTTGame").style.display = "none";
    document.getElementById("aiwhoStartsContainer").style.display = "none";

    // Show the game board container
    const gameBoardContainer = document.getElementById("ai-TTTGameBoard");
    gameBoardContainer.style.display = "flex";

    // Disable the player name input
    document.getElementById("aiPlayerName").disabled = true;
    document.getElementById("aiPlayerSymbol").disabled = true;

    // Get who starts (Player or AI)
    const whoStarts = document.getElementById("aiwhoStarts").value;

    // Initialize game state
    const aiGameBoard = document.getElementById("ai-game-board");
    const statusDisplay = document.getElementById("ai-status");
    const resetButton = document.getElementById("ai-reset");
    const giveUpButton = document.getElementById("ai-give-up");
    const newGameButton = document.getElementById("ainew-game-button");

    let currentPlayer = whoStarts === "player" ? aiPlayerSymbol : "O";
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
        gameState = Array(9).fill("");
        gameActive = true;
        giveUpButton.disabled = false; // Enable the give-up button
        currentPlayer = whoStarts === "player" ? aiPlayerSymbol : "O";

        updateStatusDisplay(currentPlayer);

        aiGameBoard.innerHTML = ""; // Clear board
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("ai-cell");
            cell.setAttribute("data-index", i);
            cell.addEventListener("click", handleCellClick);
            aiGameBoard.appendChild(cell);
        }

        if (currentPlayer === "O" && whoStarts === "ai") {
            aiMove(); // AI makes the first move
        }
    };

    const updateStatusDisplay = (currentPlayer) => {
        statusDisplay.textContent =
            currentPlayer === aiPlayerSymbol ? "Your turn as " + aiPlayerSymbol : "AI's turn";
        statusDisplay.style.color = currentPlayer === aiPlayerSymbol ? "blue" : "red";
    };

    const handleCellClick = (event) => {
        if (!gameActive || currentPlayer !== aiPlayerSymbol) return; // Ensure it's the player's turn

        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute("data-index"));

        if (gameState[cellIndex]) {
            statusDisplay.textContent = "Cell already taken!";
            return;
        }

        gameState[cellIndex] = aiPlayerSymbol;
        cell.textContent = aiPlayerSymbol;
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

        const preventWinMove = getBestMove([...gameState], aiPlayerSymbol); // Block player win
        const aiWinningMove = getBestMove([...gameState], "O"); // Find AI win

        let bestMoveIndex = aiWinningMove || preventWinMove || getRandomMove(gameState);

        if (bestMoveIndex !== null) {
            gameState[bestMoveIndex] = "O";

            const cell = document.querySelector(`[data-index="${bestMoveIndex}"]`);
            cell.textContent = "O";
            cell.classList.add("taken");

            const winner = checkWinner();
            if (winner) {
                displayWinner(winner);
            } else {
                currentPlayer = aiPlayerSymbol;
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
                return condition[line.indexOf("")];
            }
        }
        return null;
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

    const displayWinner = (winner) => {
        sendTTTData(winner, player1, 'AI');
        gameActive = false;
        giveUpButton.disabled = true;
        statusDisplay.textContent =
            winner === "Tie" ? "It's a tie!" : `Player ${winner} wins!`;
    };

    resetButton.addEventListener("click", createBoard);

    giveUpButton.addEventListener("click", () => {
        if (gameActive) {
            gameActive = false;
            giveUpButton.disabled = true;
            statusDisplay.textContent = "You gave up! AI wins!";
        }
    });

    newGameButton.addEventListener("click", () => {
        document.getElementById("aiPlayerName").disabled = false;
        document.getElementById("aiPlayerSymbol").disabled = false;
        document.getElementById("ai-startTTTGame").style.display = "block";
        document.getElementById("aiwhoStartsContainer").style.display = "block";
        gameBoardContainer.style.display = "none";
        statusDisplay.textContent = "Your turn as X";
    });

    createBoard();
}
