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
	document.getElementById("ai-startTTTGame").style.display = "none";
	document.getElementById("ai-TTTGameBoard").style.display = "flex";
	document.getElementById("aiPlayerName").disabled = true;

	const ai-gameBoard = document.getElementById("ai-game-board");
	const statusDisplay = document.getElementById("ai-status");
	const resetButton = document.getElementById("ai-reset");
	const giveUpButton = document.getElementById("ai-give-up");

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
	  ai-gameBoard.innerHTML = ""; // Clear existing cells
	  gameState = Array(9).fill("");
	  gameActive = true;
	  currentPlayer = "X";
	  statusDisplay.textContent = "Your turn as X";
  
	  for (let i = 0; i < 9; i++) {
		const cell = document.createElement("div");
		cell.classList.add("ai-cell");
		cell.setAttribute("data-index", i);
		cell.addEventListener("click", handleCellClick);
		ai-gameBoard.appendChild(cell);
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
  
	const getBestMove = (currentPlayer) => {
	  for (const condition of winningConditions) {
		const [a, b, c] = condition;
		const values = [gameState[a], gameState[b], gameState[c]];
		const emptyCount = values.filter((v) => v === "").length;
		const playerCount = values.filter((v) => v === currentPlayer).length;
  
		if (emptyCount === 1 && playerCount === 2) {
		  return condition[values.indexOf("")];
		}
	  }
	  return null;
	};
  
	const aiMove = () => {
	  if (!gameActive) return;
  
	  const bestMoveForAI = getBestMove("O");
	  const bestMoveToBlock = getBestMove("X");
  
	  let chosenMove = null;
  
	  if (bestMoveForAI && Math.random() < 0.9) {
		chosenMove = bestMoveForAI;
	  } else if (bestMoveToBlock && Math.random() < 0.9) {
		chosenMove = bestMoveToBlock;
	  } else {
		const availableCells = gameState
		  .map((cell, index) => (cell === "" ? index : null))
		  .filter((index) => index !== null);
  
		chosenMove =
		  availableCells[Math.floor(Math.random() * availableCells.length)];
	  }
  
	  gameState[chosenMove] = currentPlayer;
  
	  const cell = document.querySelector(`[data-index="${chosenMove}"]`);
	  cell.textContent = currentPlayer;
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
  
	  gameState[cellIndex] = currentPlayer;
	  cell.textContent = currentPlayer;
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
  
	const resetGame = () => createBoard();
  
	const giveUp = () => {
	  gameActive = false;
	  statusDisplay.textContent = "You gave up!";
	};
  
	resetButton.addEventListener("click", resetGame);
	giveUpButton.addEventListener("click", giveUp);
  
	createBoard(); // Initialize the game
  };
  