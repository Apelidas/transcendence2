const PongEndpoint = 'http://127.0.0.1:8000/pong/';

async function sendGame(leftScore, rightScore, againstAi, isPong, userWon, leftPlayer, rightPlayer) {
    const dataObject = {
        'leftScore': leftScore,
        'rightScore': rightScore,
        'againstAi': againstAi,
        'isPong': isPong,
        'userWon': userWon,
        'leftPlayer': leftPlayer,
        'rightPlayer': rightPlayer
    }
    console.log('sending game Data with: ' + dataObject);
    return await fetchWithToken(PongEndpoint, 'POST', {}, dataObject)
}

async function getAllPongGames(){
    try {
        const response = await fetchWithToken(PongEndpoint, 'GET', {})
        if (response.status === 200) {
            const data = await response.json();
            return data.map((game) => {
                return new GameHistory(game);
            })
        }
    } catch (exception) {
        alert('something went wrong: ' + exception);
    }
    return [];
}

class MissingDataError extends Error {
    constructor(message) {
        super(message);
        this.name = "MissingDataError";
    }
}

class GameHistory {
    constructor(data) {
        const requiredFields = [
            "id",
            "left_score",
            "right_score",
            "left_player",
            "right_player",
            "against_ai",
            "played_at",
            "user",
            "user_won",
            "isPong"
        ];

        for (const field of requiredFields) {
            if (!(field in data)) {
                throw new MissingDataError(`Missing required field: ${field}`);
            }
        }

        this.id = data.id;
        this.leftScore = data.left_score;
        this.rightScore = data.right_score;
        this.leftPlayer = data.left_player;
        this.rightPlayer = data.right_player;
        this.againstAI = data.against_ai;
        this.playedAt = new Date(data.played_at);
        this.user = data.user;
        this.userWon = data.user_won;
        this.isPong = data.isPong;
    }
}

window.sendGame = sendGame;
window.getAllPongGames = getAllPongGames;
window.GameData = GameData;
window.MissingDataError = MissingDataError;