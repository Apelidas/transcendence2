
const profileEndpoint = 'http://127.0.0.1:8000/profile/'

async function profileAdapter(){
    try {
        const response = await fetchWithToken(profileEndpoint, 'GET', {});
        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
    } catch (exception) {
        alert('something went wrong: ' + exception);
    }
    return 'thisIsStupid';
}

function toGameData(gameData){
    return GameData(gameData.win | undefined, gameData.loses | undefined, gameData.streak | undefined) | undefined;
}