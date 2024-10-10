const TokenRefreshEndpoint = 'http://127.0.0.1:8000/api/token/refresh/'

async function fetchWithToken(url, method,  headers = {}, body = {}){

    body['accessToken'] = localStorage.getItem('access_token');

    const response = await sendRequest(url, method, headers, body);
    if (response.status === 401){
        const refreshSuccess = await refreshToken();
        if (!refreshSuccess){
            throw 'InvalidTokenError'
        }
        body['accessToken'] = localStorage.getItem('access_token');
        return sendRequest(url, method, headers, body)
    }



}

async function refreshToken(){
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await sendRequest(
        TokenRefreshEndpoint,
        'POST',
        {'Content-Type': 'application/json'},
        JSON.stringify({refreshToken})
        )
    if (response.ok){
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        return true;
    }
    return  false
}

async function sendRequest(url, method, header, body){
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...header
        },
        body: JSON.stringify(body)

    });
    if(response.status === 500 || response.status === 502){
        throw 'ServerConnectionError';
    }
    return response;
}