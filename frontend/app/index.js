document.addEventListener('DOMContentLoaded', function () {
    const playPongButton = document.getElementById('playPongButton');
    const playRPSButton = document.getElementById('playRPSButton');
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const playTournamentButton = document.getElementById('playTournamentButton');
    const viewProfileButton = document.getElementById('viewProfileButton');
    const pongGame = document.getElementById('pongGame');
    const rpsGame = document.getElementById('rpsGame');
    const tournamentGame = document.getElementById('tournamentGame');
    const profilePage = document.getElementById('profilePage');
    const homepage = document.querySelector('.homepage');
	const overlay = document.getElementById('overlay');

    const userGreeting = document.getElementById('userGreeting');
    const tournamentButton = document.getElementById('tournamentButton');
    const profileButton = document.getElementById('profileButton');

    const loginPopup = document.getElementById('loginPopUp');
    const signupPopup = document.getElementById('signupPopup');

    // Function to navigate to the Pong game
    playPongButton.addEventListener('click', function () {
        showGameSection('pong');
    });

    // Function to navigate to the Rock Paper Scissors game
    playRPSButton.addEventListener('click', function () {
        showGameSection('rps');
    });

    // Function to navigate to the Tournament page
    playTournamentButton.addEventListener('click', function () {
        showGameSection('tournament');
    });

    // Function to navigate to the Profile page
    viewProfileButton.addEventListener('click', function () {
        showGameSection('profile');
    });

    // Function to open the Log In popup
    loginButton.addEventListener('click', function () {
        openPopup(loginPopup);
    });

    // Function to open the Sign Up popup
    signupButton.addEventListener('click', function () {
        openPopup(signupPopup);
    });

    // Function to close popups by clicking outside
    overlay.addEventListener('click', function () {
        closePopup(loginPopup);
        closePopup(signupPopup);
    });

    function openPopup(popup) {
        popup.style.display = 'block';
        overlay.style.display = 'block';
        toggleBlur(true);
    }

    function closePopup(popup) {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        toggleBlur(false);
    }

    function toggleBlur(shouldBlur) {
        const mainContent = document.getElementById('mainContent');
        if (shouldBlur) {
            mainContent.classList.add('blurred');
        } else {
            mainContent.classList.remove('blurred');
        }
    }

    function showGameSection(game) {
        homepage.style.display = 'none';
        pongGame.style.display = game === 'pong' ? 'block' : 'none';
        rpsGame.style.display = game === 'rps' ? 'block' : 'none';
        tournamentGame.style.display = game === 'tournament' ? 'block' : 'none';
        profilePage.style.display = game === 'profile' ? 'block' : 'none';
        signupPage.style.display = game === 'signup' ? 'block' : 'none';
        toggleBlur(false);
    }
/*
    function displayLoggedInUser(username) {
        // Hide the login button
        loginButton.classList.add('d-none');

        // Display user greeting and additional buttons
        userGreeting.querySelector('span').textContent = `Hello, ${username}!`;
        userGreeting.classList.remove('d-none');
        tournamentButton.classList.remove('d-none');
        profileButton.classList.remove('d-none');

        // Close login popup
        closePopup(loginPopup);
    }
		*/
});
