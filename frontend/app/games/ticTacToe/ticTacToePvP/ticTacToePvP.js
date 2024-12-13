
document.getElementById("startTTTGame").addEventListener('click', () => {
	start_ttt_game();
});

function start_ttt_game() {

	document.getElementById("startTTTGame").style.display = "none";
	document.getElementById("TTTGameBoard").style.display = "flex";

	const gameBoard = document.getElementById("game-board");
	const statusDisplay = document.getElementById("status");
	const resetButton = document.getElementById("reset");
  
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
	  gameBoard.innerHTML = ""; // Clear existing cells
	  gameState = Array(9).fill("");
	  gameActive = true;
	  currentPlayer = "X";
	  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  
	  for (let i = 0; i < 9; i++) {
		const cell = document.createElement("div");
		cell.classList.add("cell");
		cell.setAttribute("data-index", i);
		cell.addEventListener("click", handleCellClick);
		gameBoard.appendChild(cell);
	  }
	};
  
	const handleCellClick = (event) => {
	  if (!gameActive) return;
  
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
		currentPlayer = currentPlayer === "X" ? "O" : "X";
		statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
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
  
	const resetGame = () => createBoard();

	resetButton.addEventListener("click", resetGame);
  
	createBoard(); // Initialize the game
  };
  