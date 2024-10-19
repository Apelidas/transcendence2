const TokenRefreshEndpoint = 'http://127.0.0.1:8000/api/token/refresh/'

async function fetchWithToken(url, method, headers = {}, body) {

    headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
    const response = await sendRequest(url, method, headers, body);
    if (response.status === 401) {
        const refreshSuccess = await refreshToken();
        if (!refreshSuccess) {
            throw 'InvalidTokenError'
        }
        headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
        return sendRequest(url, method, headers, body)
    }
    return response;
}

async function refreshToken() {
    alert('token being refreshed');
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await sendRequest(
        TokenRefreshEndpoint,
        'POST',
        {'Content-Type': 'application/json'},
        JSON.stringify({refreshToken})
    )
    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
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
        }
    };
    if (body !== undefined) {
        options.body = JSON.stringify(body)
    }
    const response = await fetch(url, options);
    if (response.status === 500 || response.status === 502) {
        throw 'ServerConnectionError';
    }
    return response;
}