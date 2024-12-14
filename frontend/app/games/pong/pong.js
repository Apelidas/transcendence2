
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
	document.dispatchEvent(new Event("startPongTourn"));
});

function validateName(name) {
    // Ensure `name` is always treated as a string
    name = String(name || "").trim();
    
    if (name === "") { // Handle empty name
        alert("Player name cannot be empty.");
        return_to_page(type); // Redirect using type
        return false;
    }
    const namePattern = /^[A-Za-z]{3,}$/; // At least 3 letters, no special characters or numbers
    if (!namePattern.test(name)) {
        alert("Names must be at least 3 letters long and contain only letters (" + name + ").");
        return_to_page(pongSettings.type);
        return false;
    }
    return true;
}

function checkForUniqueNames(names) {
    const normalizedNames = names.map(name => name.trim().toLowerCase()); // Normalize to lowercase

    for (i = 0; i < normalizedNames.length - 1; i++) {
        for (j = i + 1; j < normalizedNames.length; j++) {
            if (normalizedNames[i] === normalizedNames[j]) {
                alert("Player names must be unique.");
                return_to_page(pongSettings.type);
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
        return_to_page(pongSettings.type);
        return;
    }
    player.color = document.getElementById(color_id).value;
    player.number = Math.floor(Math.random() * 100); // Random number beetween 0 and 99
    player.position = 0;
    return player;
}

function return_to_page(type) {
    if (type === 'pvp') {
        changeRoute('/games/pong/pongPvP');
    }
    else if (type === 'pong_semi_1' || type === 'pong_semi_2' || type === 'pong_finals') {
        changeRoute('/games/pong/pongBracket');
    }
    else if (type === 'ai') {
        changeRoute('/games/pong/pongAI');
    }
}
