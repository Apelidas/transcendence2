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

    const loginPopup = document.getElementById('loginPopUp');
    const signupPopup = document.getElementById('signupPopup');

    // Add event listeners for navigation buttons
    playPongButton.addEventListener('click', function () {
        navigateToSection('pong');
    });

    playRPSButton.addEventListener('click', function () {
        navigateToSection('rps');
    });

    playTournamentButton.addEventListener('click', function () {
        navigateToSection('tournament');
    });

    viewProfileButton.addEventListener('click', function () {
        navigateToSection('profile');
    });

    loginButton.addEventListener('click', function () {
        openPopup('login');
    });

    signupButton.addEventListener('click', function () {
        openPopup('signup');
    });

    // Handle clicks outside popups to close them
    overlay.addEventListener('click', function () {
        closeAllPopups(true);
    });

    // Handle back/forward navigation and URL changes
    window.addEventListener('popstate', function (event) {
        const state = event.state || {};
        if (state.section) {
            showGameSection(state.section);
        } else if (state.popup) {
            openPopup(state.popup, false); // Open the popup without pushing a new state
        } else {
            showGameSection('home');
        }
    });

    // Navigate to a specific section and update the URL
    function navigateToSection(section) {
        showGameSection(section);
        window.history.pushState({ section: section }, '', `/${section}`);
    }

    // Open a popup and update the URL
    function openPopup(popup, pushState = true) {
        if (pushState) {
            window.history.pushState({ popup: popup }, '', `/${popup}`);
        }
        closeAllPopups(false); // Close any open popups without removing blur

        if (popup === 'login') {
            loginPopup.style.display = 'block';
        } else if (popup === 'signup') {
            signupPopup.style.display = 'block';
        }

        overlay.style.display = 'block';
        toggleBlur(true);
    }

    // Close all popups
    function closeAllPopups(removeBlur = true) {
        loginPopup.style.display = 'none';
        signupPopup.style.display = 'none';
        overlay.style.display = 'none';

        if (removeBlur) {
            toggleBlur(false);
        }
    }

    // Show the appropriate game section
    function showGameSection(section) {
        homepage.style.display = section === 'home' ? 'block' : 'none';
        pongGame.style.display = section === 'pong' ? 'block' : 'none';
        rpsGame.style.display = section === 'rps' ? 'block' : 'none';
        tournamentGame.style.display = section === 'tournament' ? 'block' : 'none';
        profilePage.style.display = section === 'profile' ? 'block' : 'none';
        closeAllPopups(); // Close popups and remove blur when switching sections
    }

    // Apply or remove blur effect
    function toggleBlur(shouldBlur) {
        const mainContent = document.getElementById('mainContent');
        if (shouldBlur) {
            mainContent.classList.add('blurred');
        } else {
            mainContent.classList.remove('blurred');
        }
    }

    // Initialize based on the current URL
    const initialPath = window.location.pathname.slice(1);
    if (initialPath) {
        if (initialPath === 'login' || initialPath === 'signup') {
            openPopup(initialPath, false);
        } else {
            showGameSection(initialPath);
        }
    } else {
        showGameSection('home');
    }

    // Links within popups to switch between them
    document.getElementById('signupLink').addEventListener('click', function (event) {
        event.preventDefault();
        openPopup('signup');
    });

    document.getElementById('loginLink').addEventListener('click', function (event) {
        event.preventDefault();
        openPopup('login');
    });
});
