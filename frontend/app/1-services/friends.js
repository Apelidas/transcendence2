

async function getAllFriends() {
    try {
        const response = await fetchWithToken(friendsEndpoint, 'GET', {});
        if (response.status === 200) {
            const body = await response.json();
            if (verifyFriendsList(body)) {
                return body;
            }
        }
    } catch (exception) {
        alert('something went wrong: ' + exception);
    }
    return {};
}

function verifyFriendsList(object) {
    if (Array.isArray(object)) {
        return object.every(item =>
            item.hasOwnProperty('username') &&
            item.hasOwnProperty('status') &&
            typeof item.username === 'string' &&
            typeof item.status === 'boolean'
        );
    }
    return false;
}

async function getAllUsers() {
    const response = await fetchWithToken(userEndpoint, 'GET', {});
    if (response.status === 200) {
        const data = await response.json();
        if(verifyUsernames(data)){
            return data;
        }
    }
    return [];
}

function verifyUsernames(object) {
    if (Array.isArray(object)) {
        return object.every(item =>
            typeof item === 'string')
    }
    return false
}

async function makeFriend(username) {
    return await fetchWithToken(friendsEndpoint, 'POST', {}, {'username': username})
}

