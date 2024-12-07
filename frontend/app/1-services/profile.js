
const profileEndpoint = 'http://127.0.0.1:8000/profile/'
const changeEmailEndpoint = 'http://127.0.0.1:8000/profile/change-email'

async function getProfileData(){
    try {
        const response = await fetchWithToken(profileEndpoint, 'GET', {});
        if (response.status === 200) {
            return await response.json();
        }
    } catch (exception) {
        alert('something went wrong: ' + exception);
    }
    return 'thisIsStupid';
}

async function requestPasswordChange(newPassword){
    try {
        const response = await fetchWithToken(profileEndpoint, 'PUT', {}, {'newPassword': newPassword});
        if (response.status === 200) {
            return true;
        }
    } catch (exception) {
        alert('something went wrong: ' + exception);
    }
    return false;
}

async function requestEmailChange(newEmail){
    try {
        const response = await fetchWithToken(changeEmailEndpoint, 'PUT', {}, {'newEmail': newEmail});
        if (response.status === 200) {
            return true;
        }
    } catch (exception) {
        alert('something went wrong: ' + exception);
    }
    return false;
}

function toGameData(gameData){
    return GameData(gameData.win | undefined, gameData.loses | undefined, gameData.streak | undefined) | undefined;
}