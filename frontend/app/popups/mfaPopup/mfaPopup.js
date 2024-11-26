
document.getElementById('mfa-button').addEventListener('click', function () {
    const response = fetchWithToken(mfaDataEndpoint, 'PUT', {}, {'mfa_enabled':true}).then((response) => {
        if (response.status !== 200)
        {
            console.log("2FA Enable Error: " + response.status);
        }
        closeAllPopups();
        document.getElementById('mfaEnableButton').style.display = 'none';
        document.getElementById('mfaDisableButton').style.display = 'block';
    })
});
