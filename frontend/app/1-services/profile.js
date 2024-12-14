


async function getProfileData(){
    try {
        const response = await fetchWithToken(profileEndpoint, 'GET', {});
        if (response.status === 200) {
            const data = await response.json();
            if (isValidProfileData(data)){
                return data;
            }

        }
    } catch (exception) {
        alert('something went wrong: ' + exception);
    }
    alert('something went wrong: invalid Data transmitted by backend');
    return undefined;
}

function isValidProfileData(data) {
    return (
        typeof data === 'object' &&
        data !== null &&
        typeof data.username === 'string' &&
        typeof data.email === 'string' &&
        typeof data.is_2fa_enabled === 'boolean' &&
        typeof data.profile_picture === 'string' &&
        typeof data.pvpData === 'object' &&
        data.pvpData !== null &&
        typeof data.pvpData.wins === 'number' &&
        typeof data.pvpData.loses === 'number' &&
        typeof data.pvpData.streak === 'number' &&
        typeof data.aiData === 'object' &&
        data.aiData !== null &&
        typeof data.aiData.wins === 'number' &&
        typeof data.aiData.loses === 'number' &&
        typeof data.aiData.streak === 'number'
    );
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

async function requestUsernameChange(newUsername){
    try {
        const response = await fetchWithToken(changeUsernameEndpoint, 'PUT', {}, {'newUsername': newUsername});
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