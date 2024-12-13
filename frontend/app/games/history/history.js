const allGames = [
    {leftPlayer: "Alice", rightPlayer: "Bob", leftScore: 6, RightScore: 11, playedAt: "2024-12-01"},
    {leftPlayer: "Charlie", rightPlayer: "Dana", leftScore: 12, RightScore: 10, playedAt: "2024-12-02"},
    {leftPlayer: "Eve", rightPlayer: "Frank", leftScore: 8, RightScore: 15, playedAt: "2024-12-03"}
];
const pongHistoryPage = document.getElementById('pongHistory')
const tttHistoryPage = document.getElementById('tttHistory')


async function setUpHistory(){
    const pongGames = await getAllPongGames();
    pongGames.forEach((game) => {
        createCard(game, pongHistoryPage)
    })
    const tttGames = await getAllTicTacToeGames();
    tttGames.forEach((game) => {
        createCard(game, tttHistoryPage)
    })
    // allGames.forEach((game) => {
    //     createCard(game, pongHistoryPage);
    // });
}
function createCard(game, page) {
    const card = document.createElement('div');
    card.className = 'card ' + (game.leftScore > game.rightScore ? 'won' : 'lost');
    const dateOnly = game.playedAt.toISOString().split('T')[0];
    card.innerHTML = `
                <p><span class="highlight">${game.leftPlayer}</span> vs. <span class="highlight">${game.rightPlayer}</span></p>
                <p>Scores: <span class="highlight">${game.leftScore}</span> - <span class="highlight">${game.rightScore}</span></p>
                <p>Played at: <span class="highlight">${dateOnly}</span></p>
            `;

    page.appendChild(card);
}

