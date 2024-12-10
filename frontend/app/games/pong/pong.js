document.getElementById('pongPvpButton').addEventListener('click', function() {
    changeRoute('/games/pong/pongPvP'); 
});

document.getElementById('pongAiButton').addEventListener('click', function() {
    changeRoute('/games/pong/pongAI'); 
});

document.getElementById('pongTournButton').addEventListener('click', function() {
    changeRoute('/games/pong/pongTourn'); 
});

function validateName(name) {
    // const leftName = leftPlayerNameInput.value.trim();
    // const rightName = rightPlayerNameInput.value.trim();
    const namePattern = /^[A-Za-z]{3,}$/; // At least 3 letters, no special characters or numbers
    if (!namePattern.test(name)) {
        alert("Names must be at least 3 letters long and contain only letters.");
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
