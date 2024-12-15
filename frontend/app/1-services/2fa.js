
const mfaDataEndpoint = BACKEND_PATH + '/mfa_data/'

async function auth_2fa_get_secret() {
    try{
        const response = await fetchWithToken(mfaDataEndpoint, 'POST');
        const data = await response.json();
    
        if (!data.username || !data.secret)
            throw("Missing user data");
        return {secret: data.secret, username: data.username}
    }
    catch(exception){}
}
