
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

function validateName(name, throw_alert=true) {
    if (name === "")
        return false;
    const namePattern = /^[A-Za-z]{3,}$/; // At least 3 letters, no special characters or numbers
    if (!namePattern.test(name)) {
        if (throw_alert) {
            alert("Names must be at least 3 letters long and contain only letters (" + name + ").");
            return_to_prev_page(pongSettings.type);
        }
        return false;
    }
    return true;
}

function checkForUniqueNames(names) {
    for (i = 0; i < names.length - 1; i++) {
        for (j = i + 1; j < names.length; j++) {
            if (names[i] === names[j]) {
                alert("Player names must be unique.");
                return_to_prev_page(pongSettings.type);
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
        return_to_prev_page(pongSettings.type);
        return;
    }
    player.color = document.getElementById(color_id).value;
    player.number = Math.floor(Math.random() * 100); // Random number beetween 0 and 99
    player.position = 0;
    return player;
}

function return_to_prev_page(type) {
    if (type === 'pvp') {
        changeRoute('/games/pong/pongPvP');
    }
    else if (type === 'pong_semi_1' || type === 'pong_semi_2' || type === 'pong_finals') {
        changeRoute('/games/pong/pongBracket');
    }
}
