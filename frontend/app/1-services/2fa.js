
const mfaDataEndpoint = 'http://127.0.0.1:8000/mfa_data/'

async function auth_2fa_get_secret() {

    const response = await fetchWithToken(mfaDataEndpoint, 'POST');
    const data = await response.json();

    if (!data.username || !data.secret)
        throw("Missing user data");
    return {secret: data.secret, username: data.username}
}
