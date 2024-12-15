
// Global settings
const tttSettings = {};

document.getElementById('ticTacToePvpButton').addEventListener('click', function() {

    document.getElementById("tttPlayer1Name").disabled = false;
	document.getElementById("tttPlayer2Name").disabled = false;
    document.getElementById("startTTTGame").style.display = "inline";
	document.getElementById("TTTGameBoard").style.display = "none";
    changeRoute('/games/ticTacToe/ticTacToePvP'); 
});

document.getElementById('ticTacToeAiButton').addEventListener('click', function() {
    document.getElementById("tttPlayer1Name").disabled = false;
    document.getElementById("startTTTGame").style.display = "inline";
    document.getElementById("ai-game-board").style.display = "none";

    changeRoute('/games/ticTacToe/ticTacToeAI'); 
	document.dispatchEvent(new Event("startTTTai"));
});

document.getElementById('ticTacToeTournButton').addEventListener('click', function() {
    
    document.getElementById("startTTTTournament").style.display = "inline";
    document.getElementById("tttTournPlayer1Name").disabled = false;
	document.getElementById("tttTournPlayer2Name").disabled = false;
    document.getElementById("tttTournPlayer3Name").disabled = false;
	document.getElementById("tttTournPlayer4Name").disabled = false;
    document.getElementById("ttt-tournament-bracket").style.display = "none";
    changeRoute('/games/ticTacToe/ticTacToeTourn'); 
});


function validateNameTTT(name) {
    // Ensure `name` is always treated as a string
    name = String(name || "").trim();
    
    if (name === "") { // Handle empty name
        alert("Player name cannot be empty.");
        return_to_page(); // Redirect using type
        return false;
    }

    const namePattern = /^[A-Za-z]{3,}$/; // At least 3 letters, no special characters or numbers
    if (!namePattern.test(name)) {
        alert("Names must be at least 3 letters long and contain only letters (" + name + ").");
        return_to_page();
        return false;
    }
    return true;
}

function checkForUniqueNamesTTT(names) {
    const normalizedNames = names.map(name => String(name || "").trim().toLowerCase()); // Normalize to lowercase

    for (i = 0; i < normalizedNames.length - 1; i++) {
        for (j = i + 1; j < normalizedNames.length; j++) {
            if (normalizedNames[i] === normalizedNames[j]) {
                alert("Player names must be unique.");
                return_to_page();
                return false;
            }
        }
    }
    return true;
}

function create_ttt_player(name_id, throw_alert=true) {
    let player = {};
    player.name = document.getElementById(name_id).value.trim();
    if (!player.name) {
        if (throw_alert)
            alert("Player names must not be empty.");
        return_to_page();
        return;
    }
    player.number = Math.floor(Math.random() * 100); // Random number beetween 0 and 99
    player.position = 0;
    return player;
}
