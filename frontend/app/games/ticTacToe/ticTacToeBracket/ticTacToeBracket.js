
const ttt_players = [];

let ttt_finalist_1 = "";
let ttt_finalist_2 = "";
let ttt_winner = "";

document.getElementById("startTTTTournament").addEventListener('click', () => {

    document.getElementById("ttt-tournament-bracket").style.display = "grid";
    const player1 = create_ttt_player("tttTournPlayer1Name");
    const player2 = create_ttt_player("tttTournPlayer2Name");
    const player3 = create_ttt_player("tttTournPlayer3Name");
    const player4 = create_ttt_player("tttTournPlayer4Name", false);

    if (player1) {
        if (!validateNameTTT(player1.name)) return ;
        ttt_players.push(player1);
    }
    if (player2) {
        if (!validateNameTTT(player2.name)) return ;
        ttt_players.push(player2);
    }
    if (player3) {
        if (!validateNameTTT(player3.name)) return ;
        ttt_players.push(player3);
    }
    if (player4) {
        if (!validateNameTTT(player4.name)) return ;
        ttt_players.push(player4);
    }

    if (ttt_players.length < 3) {
        alert("A tournament requires a min. of 3 players.");
        return ;
    }

    if (!checkForUniqueNamesTTT([player1.name, player2.name, player3.name, player4.name])) {
        alert("Names should be unique.");
        return; // Do not proceed if names are not unique
    }

    set_player_postitions(ttt_players);

    ttt_finalist_1 = "";
    ttt_finalist_2 = "";
    ttt_winner = "";

    changeRoute('/games/ticTacToe/ticTacToeBracket')
    display_ttt_bracket(ttt_players);
});

function set_player_postitions(ttt_players) {
    let pos = 0;
    for (i = 0; i < ttt_players.length; i++) {
        for (j = 0; j < ttt_players.length; j++) {
            if (ttt_players[j].position == 0 && ttt_players[j].number > ttt_players[pos].number)
                pos = j;
        }
        ttt_players[pos].position = i + 1;
        ttt_players[pos].number = -1; // this is now obsolete
    }
}

function display_ttt_bracket(ttt_players) {
    const p1 = document.getElementById("ttPlayer1");
    const p2 = document.getElementById("ttPlayer2");
    const p3 = document.getElementById("ttPlayer3");
    const p4 = document.getElementById("ttPlayer4");
    const elements = [p1, p2, p3, p4];
    const w1 = document.getElementById("ttWinner1");
    const w2 = document.getElementById("ttWinner2");
    const winner = document.getElementById("ttWinner");

    // Initial stage
    const player1 = get_player_at_pos(ttt_players, 1);
    set_player_at_element(player1, p1);
    const player2 = get_player_at_pos(ttt_players, 2);
    set_player_at_element(player2, p2);
    if (ttt_finalist_1 === "") {
        document.getElementById("ttSemi1").style.display = "inline";
    } else {
        document.getElementById("ttSemi1").style.display = "none";
    }
    const player3 = get_player_at_pos(ttt_players, 3);
    set_player_at_element(player3, p3);
    let player4 = {};
    if (ttt_players.length >= 4) {
        player4 = get_player_at_pos(ttt_players, 4);
        set_player_at_element(player4, p4);
        if (ttt_finalist_2 === "") {
            document.getElementById("ttSemi2").style.display = "inline";
        } else {
            document.getElementById("ttSemi2").style.display = "none";
        }
    }
    else {
        ttt_finalist_2 = player3.name;
    }

    if (ttt_finalist_1 !== "") {
        const winner1 = get_player(ttt_players, ttt_finalist_1)
        set_player_at_element(winner1, w1);
    }
    if (ttt_finalist_2 !== "") {
        const winner2 = get_player(ttt_players, ttt_finalist_2)
        set_player_at_element(winner2, w2);
    }

    if (ttt_winner === "" && (ttt_finalist_1 !== "" && ttt_finalist_2 !== "")) {
        document.getElementById("ttFinal").style.display = "inline";
    } else {
        document.getElementById("ttFinal").style.display = "none";
    }

    if (ttt_winner !== "") {
        const champ = get_player(ttt_players, ttt_winner)
        set_player_at_element(champ, winner);
    }

    document.getElementById("ttSemi1").addEventListener('click', () => {
        tttSettings.type = "ttt_semi_1";
        start_ttt_game(player1.name, player2.name, tttSettings);
    });

    document.getElementById("ttSemi2").addEventListener('click', () => {
        tttSettings.type = "ttt_semi_2";
        start_ttt_game(player3.name, player4.name, tttSettings);
    });

    document.getElementById("ttFinal").addEventListener('click', () => {
        tttSettings.type = "ttt_finals";
        const finalist_1 = get_player(ttt_players, ttt_finalist_1);
        const finalist_2 = get_player(ttt_players, ttt_finalist_2);
        start_ttt_game(finalist_1.name, finalist_2.name, tttSettings);
    });
}

function start_ttt_game(player1, player2, local_settings) {

    if (local_settings.type === "ttt_semi_1") {
        document.getElementById("ttSemi1").style.display = "none";
    } else if (local_settings.type === "ttt_semi_2") {
        document.getElementById("ttSemi2").style.display = "none";
    } else if (local_settings.type === "ttt_finals") {
        document.getElementById("ttFinal").style.display = "none";
    }
	document.getElementById("TTTTournGameBoard").style.display = "flex";
	document.getElementById("tttPlayer1Name").disabled = true;
	document.getElementById("tttPlayer2Name").disabled = true;

	const gameBoard = document.getElementById("tourn-game-board");
	const statusDisplay = document.getElementById("tourn-status");
  
	let currentPlayer = "X";
	let currentPlayerName = player1;
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
	  statusDisplay.textContent = `Player ${currentPlayer}'s turn (${currentPlayerName})`;
  
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
	  const winnerName = winner === 'X' ? player1 : player2;
  
	  if (winner) {
        sendTTTData(winner, player1, player2);
		gameActive = false;
		statusDisplay.textContent = winner === "Tie" ? "It's a tie!" : `${winnerName} wins!`;
        document.getElementById("TTTTournGameBoard").style.display = "none";
        if (tttSettings.type === "ttt_semi_1") {
            ttt_finalist_1 = winnerName;
        } else if (tttSettings.type === "ttt_semi_2") {
            ttt_finalist_2 = winnerName;
        } else if (tttSettings.type === "ttt_finals") {
            ttt_winner = winnerName;
            alert(winnerName + " wins the tournament!");
        }
        display_ttt_bracket(ttt_players);
	  } else {
		currentPlayer = currentPlayer === "X" ? "O" : "X";
		currentPlayerName = currentPlayer === "X" ? player1 : player2;
		statusDisplay.textContent = `Player ${currentPlayer}'s turn (${currentPlayerName})`;
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
  
	createBoard(); // Initialize the game
  };
