
// Global settings
const tttSettings = {};

document.getElementById('ticTacToePvpButton').addEventListener('click', function() {

    document.getElementById("startTTTGame").style.display = "inline";
    document.getElementById("tttPlayer1Name").disabled = false;
    document.getElementById("tttPlayer1Symbol").disabled = false;
	document.getElementById("tttPlayer2Name").disabled = false;
    document.getElementById("tttPlayer2Symbol").disabled = false;
	document.getElementById("TTTGameBoard").style.display = "none";
    changeRoute('/games/ticTacToe/ticTacToePvP'); 
});

document.getElementById('ticTacToeAiButton').addEventListener('click', function() {
    document.getElementById("ai-startTTTGame").style.display = "inline";
    document.getElementById("aiPlayerName").disabled = false;
    document.getElementById("aiPlayerSymbol").disabled = false;
    document.getElementById("ai-TTTGameBoard").style.display = "none";
    changeRoute('/games/ticTacToe/ticTacToeAI'); 
});

document.getElementById('ticTacToeTournButton').addEventListener('click', function() {
    
    document.getElementById("startTTTTournament").style.display = "inline";
    document.getElementById("tttTournPlayer1Name").disabled = false;
    document.getElementById("tttTournPlayer1Symbol").disabled = false;
	document.getElementById("tttTournPlayer2Name").disabled = false;
    document.getElementById("tttTournPlayer2Symbol").disabled = false;
    document.getElementById("tttTournPlayer3Name").disabled = false;
    document.getElementById("tttTournPlayer3Symbol").disabled = false;
	document.getElementById("tttTournPlayer4Name").disabled = false;
    document.getElementById("tttTournPlayer4Symbol").disabled = false;
    document.getElementById("ttt-tournament-bracket").style.display = "none";
    changeRoute('/games/ticTacToe/ticTacToeTourn'); 
});


function validateNameTTT(name) {
    // Ensure `name` is always treated as a string
    name = String(name || "").trim();
    
    if (name === "") { // Handle empty name
        alert("Player name cannot be empty.");
        return false;
    }

    const namePattern = /^[\x20-\x7E]{3,}$/; // At least 3 letters
    if (!namePattern.test(name)) {
        alert("Names must be at least 3 letters long (" + name + ").");
        return false;
    }
    return true;
}

function checkForUniqueNamesTTT(names) {
    return true; // TODO
    const normalizedNames = names.map(item=> String(item.name || "").trim().toLowerCase()); // Normalize to lowercase
 
    for (i = 0; i < normalizedNames.length - 1; i++) {
        for (j = i + 1; j < normalizedNames.length - 1; j++) {
            if (normalizedNames[i] === normalizedNames[j]) {
                alert("Player names must be unique.");
                return false;
            }
        }
    }
    return true;
}

function checkForUniqueSymbolsTTT() {
    // TODO
    return true;
}

function create_ttt_player(name_id, throw_alert=true) {
    let player = {};
    player.name = document.getElementById(name_id).value.trim();
    if (!player.name) {
        if (throw_alert)
            alert("Player names must not be empty.");
        return;
    }
    player.number = Math.floor(Math.random() * 100); // Random number beetween 0 and 99
    player.position = 0;
    return player;
}

async function sendTTTData(winner, leftPlayer, rightPlayer){
    let response = undefined;
    if (winner === 'Tie'){
        response = await sendGame(0,0, false, false, leftPlayer, rightPlayer);
    }
    else {
        const didLeftWin = winner === 'X';
        response = await sendGame(didLeftWin ? 1 : 0, didLeftWin ? 0 : 1, false, didLeftWin, leftPlayer, rightPlayer);
    }
    if (response !== undefined && response.status !== 200){
        alert('There has been an error. GameData could not be stored');
    }
}
