const PongEndpoint = 'http://127.0.0.1:8000/pong/';

async function sendGame(leftScore, rightScore, againstAi, isPong, userWon) {
    const dataObject = {
        'leftScore': leftScore,
        'rightScore': rightScore,
        'againstAi': againstAi,
        'isPong': isPong,
        'userWon': userWon
    }
    return await fetchWithToken(PongEndpoint, 'POST', {}, dataObject)
}