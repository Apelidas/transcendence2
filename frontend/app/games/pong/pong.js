document.getElementById('pongPvpButton').addEventListener('click', function() {
    changeRoute('/games/pong/pongPvP');
	document.dispatchEvent(new Event("startPongPvp"));
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
    const namePattern = /^[A-Za-z]{3,}$/; // At least 3 letters, no special characters or numbers
    if (!namePattern.test(name)) {
        if (throw_alert) alert("Names must be at least 3 letters long and contain only letters (" + name + ").");
        return false;
    }
    return true;
}

function checkForUniqueNames(names) {
    for (i = 0; i < names.length - 1; i++) {
        for (j = i + 1; j < names.length; j++) {
            if (names[i] === names[j]) {
                alert("Player names must be unique.");
                return false;
            }
        }
    }
    return true;
}