
// Global settings
const pongSettings = {};

document.getElementById('pongPvpButton').addEventListener('click', function() {
    changeRoute('/games/pong/pongPvP');
});

document.getElementById('pongAiButton').addEventListener('click', function() {
    changeRoute('/games/pong/pongAI');
	document.dispatchEvent(new Event("startPongAi")); 
});

document.getElementById('pongTournButton').addEventListener('click', function() {
    changeRoute('/games/pong/pongTourn');
});
    
function prefillPlayerName(inputField){
    const username = getCookie('username'); // Replace 'username' with your cookie's name
    if (username) {
        inputField.value = username; // Set value if the cookie exists
    }
    else {
        inputField.value = '';
    }
}

function validateName(name) {
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

function checkForUniqueNames(names) {
    const normalizedNames = names.map(item=> String(item.name || "").trim().toLowerCase()); // Normalize to lowercase
 
    for (i = 0; i < normalizedNames.length - 1; i++) {
        for (j = i + 1; j < normalizedNames.length - 1; j++) {
            if (normalizedNames[i] === normalizedNames[j]) {
                console.log(normalizedNames[i] + ' vs ' + normalizedNames[j]);
                alert("Player names must be unique.");
                return false;
            }
        }
    }
    return true;
}

function create_player(name_id, color_id, throw_alert=true) {
    let player = {};
    player.name = document.getElementById(name_id).value.trim();
    if (!player.name) {
        if (throw_alert)
            alert("Player names must not be empty.");
        return;
    }
    player.color = document.getElementById(color_id).value;
    player.number = Math.floor(Math.random() * 100); // Random number beetween 0 and 99
    player.position = 0;
    return player;
}

function return_to_page() {
    const type = pongSettings.type; // Use global setting
    console.log('return_to_page type: ' + type);
    if (type === 'pong_semi_1' || type === 'pong_semi_2' || type === 'pong_finals') {
        // Tournament-specific logic
        changeRoute('/games/pong/pongBracket');
    } else if (type === "tournament") {
        changeRoute('/games/pong/pongTourn');
    } else if (type === 'pvp') {
        changeRoute('/games/pong/pongPvP');
    } else if (type === 'ai') {
        changeRoute('/games/pong/pongAI');
    } else if (window.history.length > 1) {
        window.history.back(); // Use browser's history for other scenarios
    } else {
        changeRoute('/games/pong'); // Default route
    }
}


