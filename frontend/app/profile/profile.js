document.getElementById('changeEmailButton').addEventListener('click', function () {
    alert('Change Email functionality here');
});

document.getElementById('changePasswordButton').addEventListener('click', function () {
    alert('Change Password functionality here');
});

document.getElementById('changeAliasButton').addEventListener('click', function () {
    alert('Change Alias functionality here');
});

document.getElementById('change2FAToggle').addEventListener('click', function () {
    toggle = document.getElementById('change2FAToggle');
    qrcode = document.getElementById('qrcode');
    if (toggle.checked) {
        qrcode.style.display = 'block';
        auth_2fa_show_qrcode();
    } else {
        qrcode.style.display = 'none';
        qrcode.innerHTML = "";
        clearInterval(tokenInterval); // DEBUG
    }
});


function setProfileData(userData) {
    document.getElementById('profileName').textContent = userData.username;
    // document.getElementById('pvpWins').textContent = userData.pvpData.wins;
    // document.getElementById('pvpLoses').textContent = userData.pvpData.loses;
    // document.getElementById('pvpStreak').textContent = userData.pvpData.streak;
    // document.getElementById('aiWins').textContent = userData.aiData.wins;
    // document.getElementById('aiLoses').textContent = userData.aiData.loses;
    // document.getElementById('aiStreak').textContent = userData.aiData.streak;
    // document.getElementById('tournamentWins').textContent = userData.tournamentData.wins;
    // document.getElementById('tournamentLoses').textContent = userData.tournamentData.loses;
    // document.getElementById('tournamentStreak').textContent = userData.tournamentData.streak;
    // document.getElementById('ticTacToeWins').textContent = userData.ticTacToeData.wins;
    // document.getElementById('ticTacToeLoses').textContent = userData.ticTacToeData.loses;
    // document.getElementById('ticTacToeStreak').textContent = userData.ticTacToeData.streak;
}


document.addEventListener('DOMContentLoaded', function () {
    // Example data fetching or setting for profile
    const profileName = document.getElementById('profileName');
    const profilePicture = document.getElementById('profilePicture');

    // Example: Set profile name from localStorage or a session
    const name = localStorage.getItem('username') || 'User';
    profileName.textContent = name;

    // Example: Set profile picture (you can update this with actual logic)
    const profilePicUrl = localStorage.getItem('profilePicUrl') || '../0-assets/default-profile.png';
    profilePicture.src = profilePicUrl;

    // Fetch and display stats (these would typically be fetched from a backend service)
    document.getElementById('pvpWins').textContent = localStorage.getItem('pvpWins') || 0;
    document.getElementById('pvpLoses').textContent = localStorage.getItem('pvpLoses') || 0;
    document.getElementById('pvpStreak').textContent = localStorage.getItem('pvpStreak') || 0;
    document.getElementById('aiWins').textContent = localStorage.getItem('aiWins') || 0;
    document.getElementById('aiLoses').textContent = localStorage.getItem('aiLoses') || 0;
    document.getElementById('aiStreak').textContent = localStorage.getItem('aiStreak') || 0;
    document.getElementById('tournamentWins').textContent = localStorage.getItem('tournamentWins') || 0;
    document.getElementById('tournamentLoses').textContent = localStorage.getItem('tournamentLoses') || 0;
    document.getElementById('tournamentStreak').textContent = localStorage.getItem('tournamentStreak') || 0;
    document.getElementById('ticTacToeWins').textContent = localStorage.getItem('ticTacToeWins') || 0;
    document.getElementById('ticTacToeLoses').textContent = localStorage.getItem('ticTacToeLoses') || 0;
    document.getElementById('ticTacToeStreak').textContent = localStorage.getItem('ticTacToeStreak') || 0;

});
