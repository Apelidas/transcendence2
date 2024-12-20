
function seeIfLoggedIn(){
    if (getCookie('refresh_token')){
        return true;
    }
    return false;
}

async function fetchWithToken(url, method, headers = {}, body) {
    if (!seeIfLoggedIn()){
        return undefined;
    }
    console.log('send to: ' + url);
    const accessToken = getCookie('access_token');
    if (!accessToken){
        const isrefreshed = await refreshToken();
        if (!isrefreshed){
            const loggedOutEvent = new CustomEvent('loggedOut');
            document.dispatchEvent(loggedOutEvent);
            return;
        }
    }
    headers['Authorization'] = 'Bearer ' + accessToken;
    return await sendRequest(url, method, headers, body);
}

async function refreshToken() {
    const refresh_token = getCookie('refresh_token');
    const response = await sendRequest(
        TokenRefreshEndpoint,
        'POST',
        {},
        {refresh: refresh_token}
    )
    if (response.ok) {
        const data = await response.json();
        setCookie('access_token', data.access, 1800000);
        setCookie('refresh_token', data.refresh, 86400000);
        return true;
    }
    return false
}

async function sendRequest(url, method, header, body) {

    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...header
        },
        body: JSON.stringify(body),
        credentials: 'include'
    };
    const response = await fetch(url, options);
    if (response.status === 500 || response.status === 502) {
        throw 'ServerConnectionError';
    }
    return response;
}

function setCookie(name, value, expiresInMs){
    document.cookie = `${name}=${value}; expires=` + new Date(Date.now() + expiresInMs).toUTCString() + "; path=/";
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}