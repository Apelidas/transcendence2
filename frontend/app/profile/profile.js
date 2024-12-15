document.getElementById('addFriendPopUpButton').addEventListener('click', function () {
    setupFriendsPopup();
    openPopup('addFriend');
});

document.getElementById('changePasswordButton').addEventListener('click', function () {
    openPopup('changePassword')
});

document.getElementById('changeEmailButton').addEventListener('click', function () {
    openPopup('changeEmail')
});

document.getElementById('changeAliasButton').addEventListener('click', function () {
    openPopup('changeUsername');
});

document.getElementById('ChangeProfilePictureButton').addEventListener('click', function () {
    openPopup('pictureUploadPopup');
});

document.getElementById('mfaEnableButton').addEventListener('click', function () {
    try {
        const secret_data = auth_2fa_get_secret();
        showQrCode(secret_data);
    } catch (err) {
        console.error(err);
    }
});

async function showQrCode(data) {
    const info = await data;
    console.log('secret-data: ' + info.secret);
    const otpauth = window.otplib.authenticator.keyuri(data.username, "transcendence", info.secret);
    const qrcode = document.getElementById("qrcode");
    qrcode.innerHTML = "";
    new QRCode(qrcode, {
        text: otpauth,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    openPopup('mfa-enable');
    qrcode.style.display = 'block';
}

document.getElementById('mfaDisableButton').addEventListener('click', function () {
    const response = fetchWithToken(mfaDataEndpoint, 'PUT', {}, {'mfa_enabled': false});
    if (response.status !== 200) {
        console.log("2FA Disable Error: " + response.status)
    }
    document.getElementById('mfaEnableButton').style.display = 'block';
    document.getElementById('mfaDisableButton').style.display = 'none';
});

function setProfileData(userData) {
    document.getElementById('profileName').textContent = userData.username;
    if (userData.is_2fa_enabled) {
        document.getElementById("mfaDisableButton").style.display = 'block';
        document.getElementById("mfaEnableButton").style.display = 'none';
    } else {
        document.getElementById("mfaEnableButton").style.display = 'block';
        document.getElementById("mfaDisableButton").style.display = 'none';
    }
    document.getElementById('profilePicture').src = userData.profile_picture
    document.getElementById('pvpWins').textContent = userData.pvpData.wins;
    document.getElementById('pvpLoses').textContent = userData.pvpData.loses;
    document.getElementById('pvpStreak').textContent = userData.pvpData.streak;
    document.getElementById('aiWins').textContent = userData.aiData.wins;
    document.getElementById('aiLoses').textContent = userData.aiData.loses;
    document.getElementById('aiStreak').textContent = userData.aiData.streak;
    document.getElementById('ticTacToePvpWins').textContent = userData.tiTacToePvpData.wins;
    document.getElementById('ticTacToePvpLoses').textContent = userData.tiTacToePvpData.loses;
    document.getElementById('ticTacToePvpStreak').textContent = userData.tiTacToePvpData.streak;
    document.getElementById('ticTacToeAiWins').textContent = userData.tiTacToeAiData.wins;
    document.getElementById('ticTacToeAiLoses').textContent = userData.tiTacToeAiData.loses;
    document.getElementById('ticTacToeAiStreak').textContent = userData.tiTacToeAiData.streak;

    console.log(userData);
}

async function setupFriendslist() {
    const allFriends = await getAllFriends();
    populateFriendsList(allFriends);
}


function populateFriendsList(friends) {
    const friendsList = document.getElementById('friendsList');
    friendsList.innerHTML = ''; // Clear the list before adding new items

    friends.forEach(friend => {
        const card = document.createElement('div');
        card.classList.add('friend-card');

        const statusDot = document.createElement('span');
        statusDot.classList.add('status-dot', friend.status ? 'online' : 'offline');

        const nameElement = document.createElement('span');
        nameElement.classList.add('friend-name');
        nameElement.textContent = friend.username;

        card.appendChild(statusDot);
        card.appendChild(nameElement);

        friendsList.appendChild(card);
    });
}

let generalChart = null;
let pongChart = null;

// Fetch wins per day data from the backend API and render the chart
function renderGeneralChart(data) {

    const labels = data.map(item => item.date);
    const winCounts = data.map(item => item.win_count);
    const loseCounts = data.map(item => item.lose_count);
    const graph = document.getElementById('generalChart').getContext('2d');

    if (generalChart) {
        generalChart.destroy();
    }

    generalChart = new Chart(graph, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Wins Per Day',
                    data: winCounts,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Loses Per Day',
                    data: loseCounts,
                    borderColor: 'rgb(184,67,130)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {display: true},
                tooltip: {enabled: true},
            },
            scales: {
                x: {
                    title: {display: true, text: 'Date'}
                },
                y: {
                    title: {display: true, text: 'Wins'},
                    beginAtZero: true
                }
            }
        }
    });
    // console.log(data);
}

function renderPongChart(data) {
    const labels = data.map(item => item.date);
    const pongWinCounts = data.map(item => item.pong_win_count)
    const pongLoseCounts = data.map(item => item.pong_lose_count)
    const graph = document.getElementById('pongChart').getContext('2d');

    if (pongChart) {
        pongChart.destroy();
    }

    pongChart = new Chart(graph, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Wins Per Day',
                    data: pongWinCounts,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Loses Per Day',
                    data: pongLoseCounts,
                    borderColor: 'rgb(184,67,130)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {display: true},
                tooltip: {enabled: true},
            },
            scales: {
                x: {
                    title: {display: true, text: 'Date'}
                },
                y: {
                    title: {display: true, text: 'Wins'},
                    beginAtZero: true
                }
            }
        }
    });

}