
const secret = window.otplib.authenticator.generateSecret();

function auth_2fa_get_token(secret) {
    let token = window.otplib.authenticator.generate(secret);
    console.log("2FA token = " + token);
    return token;
}

async function check_2fa() {
    console.log("2FA secret = " + secret);

    // qrcode
    const otpauth = window.otplib.authenticator.keyuri("daniel", "transcendence", secret);
    console.log("2FA otpauth = " + otpauth);

    let qrcode = new QRCode(document.getElementById("qrcode"), {
        text: otpauth,
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    const token = auth_2fa_get_token(secret);
    setInterval(auth_2fa_get_token, 10000, secret);
    try {
        const isValid = window.otplib.authenticator.check(token, secret);
        console.log("2FA valid check!");
    } catch (err) {
        console.error(err);
    }
}

check_2fa();
