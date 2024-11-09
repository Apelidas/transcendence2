
const mfaDataEndpoint = 'http://127.0.0.1:8000/mfa_data/'

let tokenInterval; // DEBUG

function auth_2fa_get_token(secret) {
    let token = window.otplib.authenticator.generate(secret);
    console.log("2FA token = " + token);
    return token;
}

async function auth_2fa_show_qrcode() {

    const response = await fetchWithToken(mfaDataEndpoint, 'POST');
    const data = await response.json();

    if (!data.username || !data.secret)
        throw("Missing user data");
    const otpauth = window.otplib.authenticator.keyuri(data.username, "transcendence", data.secret);

    new QRCode(document.getElementById("qrcode"), {
        text: otpauth,
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    const token = auth_2fa_get_token(data.secret);
    tokenInterval = setInterval(auth_2fa_get_token, 10000, data.secret); // DEBUG
    try {
        const isValid = window.otplib.authenticator.check(token, data.secret);
        console.log("2FA valid check!");
    } catch (err) {
        console.error(err);
    }
}
