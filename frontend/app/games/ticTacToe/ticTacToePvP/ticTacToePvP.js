
let pvpPlayer1Symbol = "";
let pvpPlayer2Symbol = "";

document.getElementById("startTTTGame").addEventListener("click", () => {
    
    const player1 = document.getElementById("tttPlayer1Name").value;
    pvpPlayer1Symbol = document.getElementById("tttPlayer1Symbol").value;
    const player2 = document.getElementById("tttPlayer2Name").value;
    pvpPlayer2Symbol = document.getElementById("tttPlayer2Symbol").value;

	if (validateNameTTT(player1) && validateNameTTT(player2)) {
		// Check if names are unique
		if (player1.toLowerCase() === player2.toLowerCase()) {
			alert("Please use different names, even though you want to be the same person.");
			return;
		}
	
		// Check if symbols are unique
		if (pvpPlayer1Symbol === pvpPlayer2Symbol) {
			alert("Please use different symbols to be able to play.");
			return;
		}
	
		// All checks passed, start the game
		start_ttt_pvp_game(player1, player2);
	} else {
		//alert("One or both player names are invalid. Please ensure names are at least 3 characters long.");
		return;
	}

});

function start_ttt_pvp_game(player1, player2) {
    document.getElementById("startTTTGame").style.display = "none";
    document.getElementById("whoStartsContainer").style.display = "none";
    document.getElementById("TTTGameBoard").style.display = "flex";

    document.getElementById("tttPlayer1Name").disabled = true;
    document.getElementById("tttPlayer1Symbol").disabled = true;
    document.getElementById("tttPlayer2Name").disabled = true;
    document.getElementById("tttPlayer2Symbol").disabled = true;

    const gameBoard = document.getElementById("game-board");
    const statusDisplay = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    const giveUpButton = document.getElementById("give-up");
    const newGameButton = document.getElementById("new-game-button");

    const whoStarts = document.getElementById("whoStarts").value;
    let currentPlayer = whoStarts === "player1" ? pvpPlayer1Symbol : pvpPlayer2Symbol;
    let currentPlayerName = whoStarts === "player1" ? player1 : player2;

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
        giveUpButton.disabled = false;

        currentPlayer = whoStarts === "player1" ? pvpPlayer1Symbol : pvpPlayer2Symbol;
        currentPlayerName = whoStarts === "player1" ? player1 : player2;
        updateStatusDisplay(currentPlayer, currentPlayerName);

        gameBoard.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-index-pvp", i);
            cell.addEventListener("click", handleCellClick);
            gameBoard.appendChild(cell);
        }
    };

    const updateStatusDisplay = (currentPlayer, currentPlayerName) => {
        statusDisplay.textContent = `Player ${currentPlayer}'s turn (${currentPlayerName})`;
        statusDisplay.style.color = currentPlayer === pvpPlayer1Symbol ? "blue" : "red";
    };

    const handleCellClick = (event) => {
        if (!gameActive) return;

        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute("data-index-pvp"));

        if (gameState[cellIndex]) {
            statusDisplay.textContent = "Cell already taken!";
            return;
        }

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken");

        const winner = checkWinner();
        const winnerName = winner === pvpPlayer1Symbol ? player1 : player2;

        if (winner) {
            gameActive = false;
            giveUpButton.disabled = true;
            sendTTTData(winner, player1, player2);
            statusDisplay.textContent =
                winner === "Tie" ? "It's a tie!" : `${winnerName} wins!`;
        } else {
            currentPlayer = currentPlayer === pvpPlayer1Symbol ? pvpPlayer2Symbol : pvpPlayer1Symbol;
            currentPlayerName = currentPlayer === pvpPlayer1Symbol ? player1 : player2;
            updateStatusDisplay(currentPlayer, currentPlayerName);
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

    resetButton.addEventListener("click", () => createBoard());

    giveUpButton.addEventListener("click", () => {
        if (gameActive) {
            gameActive = false;
            giveUpButton.disabled = true;
            statusDisplay.textContent = `${currentPlayerName} gave up! The other player wins!`;
        }
    });

    newGameButton.addEventListener("click", () => {
        document.getElementById("tttPlayer1Name").disabled = false;
        document.getElementById("tttPlayer1Symbol").disabled = false;
        document.getElementById("tttPlayer2Name").disabled = false;
        document.getElementById("tttPlayer2Symbol").disabled = false;
        document.getElementById("startTTTGame").style.display = "block";
        document.getElementById("whoStartsContainer").style.display = "block";
        document.getElementById("TTTGameBoard").style.display = "none";
        statusDisplay.textContent = "Player X's turn";
    });

    createBoard();
}
