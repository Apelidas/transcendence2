
const mfaDataEndpoint = 'http://127.0.0.1:8000/mfa_data/'

const secret = window.otplib.authenticator.generateSecret();
let tokenInterval; // DEBUG

function auth_2fa_get_token(secret) {
    let token = window.otplib.authenticator.generate(secret);
    console.log("2FA token = " + token);
    return token;
}

async function auth_2fa_show_qrcode() {
    console.log("2FA secret = " + secret);

    // TODO POST instead of GET with (min.) username
    const response = await fetchWithToken(mfaDataEndpoint, 'POST');
    const data = await response.json();
    console.log(data);

    let username = "agent47";
    // TODO get username
    const otpauth = window.otplib.authenticator.keyuri(username, "transcendence", secret);
    console.log("2FA otpauth = " + otpauth);

    new QRCode(document.getElementById("qrcode"), {
        text: otpauth,
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    const token = auth_2fa_get_token(secret);
    tokenInterval = setInterval(auth_2fa_get_token, 10000, secret); // DEBUG
    try {
        const isValid = window.otplib.authenticator.check(token, secret);
        console.log("2FA valid check!");
    } catch (err) {
        console.error(err);
    }
}
