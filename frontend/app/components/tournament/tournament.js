const registerButton = document.getElementById('registerButton');
const startTournamentButton = document.getElementById('startTournamentButton');
const nextMatchButton = document.getElementById('nextMatchButton');
const playerAliasInput = document.getElementById('playerAlias');
const playerList = document.getElementById('playerList');
const matchList = document.getElementById('matchList');
const currentMatchDisplay = document.getElementById('currentMatch');
const registrationSection = document.getElementById('registration');
const matchmakingSection = document.getElementById('matchmaking');
const announcementSection = document.getElementById('announcement');

let players = [];
let matches = [];
let currentMatchIndex = 0;

// Function to register a player
function registerPlayer() {
    const alias = playerAliasInput.value.trim();
    if (alias && !players.includes(alias)) {
        players.push(alias);
        const listItem = document.createElement('li');
        listItem.textContent = alias;
        playerList.appendChild(listItem);
        playerAliasInput.value = '';
    } else {
        alert('Please enter a unique alias name.');
    }
}

// Function to generate tournament matches
function generateMatches() {
    matches = [];
    while (players.length > 1) {
        const player1 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        const player2 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        matches.push([player1, player2]);
    }
    if (players.length === 1) {
        matches.push([players[0], 'Bye']);
    }
    matches.forEach(match => {
        const listItem = document.createElement('li');
        listItem.textContent = `${match[0]} vs ${match[1]}`;
        matchList.appendChild(listItem);
    });
}

// Function to announce the next match
function announceNextMatch() {
    if (currentMatchIndex < matches.length) {
        const match = matches[currentMatchIndex];
        currentMatchDisplay.textContent = `${match[0]} vs ${match[1]}`;
        currentMatchIndex++;
    } else {
        currentMatchDisplay.textContent = 'Tournament Over!';
        nextMatchButton.style.display = 'none';
    }
}

// Event listeners
registerButton.addEventListener('click', registerPlayer);

startTournamentButton.addEventListener('click', () => {
    if (players.length >= 3) {
        registrationSection.style.display = 'none';
        matchmakingSection.style.display = 'block';
        generateMatches();
    } else {
        alert('At least 3 players are required to start the tournament.');
    }
});

nextMatchButton.addEventListener('click', announceNextMatch);

// Start the first match when the tournament begins
startTournamentButton.addEventListener('click', () => {
    if (players.length >= 3) {
        registrationSection.style.display = 'none';
        matchmakingSection.style.display = 'none';
        announcementSection.style.display = 'block';
        nextMatchButton.style.display = 'block';
        announceNextMatch();
    } else {
        alert('At least 3 players are required to start the tournament.');
    }
});
