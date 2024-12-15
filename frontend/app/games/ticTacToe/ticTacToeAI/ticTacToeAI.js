document.getElementById("ai-startTTTGame").addEventListener("click", () => {
    // Retrieve and trim player name
    const player1 = document.getElementById("aiPlayerName").value.trim();

    // Validate player name
    const isPlayer1Valid = validateNameTTT(player1);

    // Start the game only if validation passes
    if (isPlayer1Valid) {
        start_ttt_ai_game(player1);
    } else {
        // Show error message or handle invalid input
        console.log("Validation failed: Game cannot start.");
        return false;
    }
});
function start_ttt_ai_game(player1) {
    // Hide the Start button
    document.getElementById("ai-startTTTGame").style.display = "none";

    // Show the game board
    const gameBoardContainer = document.getElementById("ai-TTTGameBoard");
    gameBoardContainer.style.display = "flex";

    // Disable player name input
    document.getElementById("aiPlayerName").disabled = true;

    // Initialize board and game state
    const aiGameBoard = document.getElementById("ai-game-board");
    aiGameBoard.innerHTML = ""; // Clear any existing cells

    const statusDisplay = document.getElementById("ai-status");
    let currentPlayer = "X";
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
        currentPlayer = "X";
        statusDisplay.textContent = `Your turn as X`;

        aiGameBoard.innerHTML = ""; // Clear the board
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("ai-cell");
            cell.setAttribute("data-index", i);
            cell.addEventListener("click", handleCellClick);
            aiGameBoard.appendChild(cell);
        }
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

    const aiMove = () => {
        if (!gameActive) return;

        const availableCells = gameState
            .map((cell, index) => (cell === "" ? index : null))
            .filter((index) => index !== null);

        if (availableCells.length === 0) return;

        const randomMove =
            availableCells[Math.floor(Math.random() * availableCells.length)];

        gameState[randomMove] = "O";
        const cell = document.querySelector(`[data-index="${randomMove}"]`);
        cell.textContent = "O";
        cell.classList.add("taken");

        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            statusDisplay.textContent =
                winner === "Tie"
                    ? "It's a tie!"
                    : `Player ${winner} wins!`;
        } else {
            currentPlayer = "X";
            statusDisplay.textContent = "Your turn as X";
        }
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
            gameActive = false;
            statusDisplay.textContent =
                winner === "Tie"
                    ? "It's a tie!"
                    : `Player ${winner} wins!`;
        } else {
            currentPlayer = "O";
            statusDisplay.textContent = "AI's turn";
            setTimeout(aiMove, 500);
        }
    };

    // Reset the game
    const resetButton = document.getElementById("ai-reset");
    resetButton.addEventListener("click", createBoard);

    createBoard(); // Initialize the game
}
