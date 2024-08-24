// Utility functions available globally
function navigateToSection(section) {
    showGameSection(section);
    window.history.pushState({ section: section }, '', `/${section}`);
}

function openPopup(popup, pushState = true) {
    if (pushState) {
        window.history.pushState({ popup: popup }, '', `/${popup}`);
    }
    closeAllPopups(false); // Close any open popups without removing blur

    if (popup === 'login') {
        document.getElementById('loginPopup').style.display = 'block';
    } else if (popup === 'signup') {
        document.getElementById('signupPopup').style.display = 'block';
    }

    document.getElementById('overlay').style.display = 'block';
    toggleBlur(true);
}

function closeAllPopups(removeBlur = true) {
    document.getElementById('loginPopup').style.display = 'none';
    document.getElementById('signupPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

    if (removeBlur) {
        toggleBlur(false);
    }
}

function showGameSection(section) {
    document.querySelector('.homepage').style.display = section === 'home' ? 'block' : 'none';
    document.getElementById('pongGame').style.display = section === 'pong' ? 'block' : 'none';
    document.getElementById('rpsGame').style.display = section === 'rps' ? 'block' : 'none';
    document.getElementById('tournamentGame').style.display = section === 'tournament' ? 'block' : 'none';
    document.getElementById('profilePage').style.display = section === 'profile' ? 'block' : 'none';
    closeAllPopups(); // Close popups and remove blur when switching sections
}

function toggleBlur(shouldBlur) {
    const mainContent = document.getElementById('mainContent');
    if (shouldBlur) {
        mainContent.classList.add('blurred');
    } else {
        mainContent.classList.remove('blurred');
    }
}

// Attach the utility functions to the window object to make them globally accessible
window.navigateToSection = navigateToSection;
window.openPopup = openPopup;
window.closeAllPopups = closeAllPopups;
window.toggleBlur = toggleBlur;
window.showGameSection = showGameSection;

// DOMContentLoaded event listener for the initial setup
document.addEventListener('DOMContentLoaded', function () {
    const playPongButton = document.getElementById('playPongButton');
    const playRpsButton = document.getElementById('playRpsButton');
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const playTournamentButton = document.getElementById('playTournamentButton');
    const viewProfileButton = document.getElementById('viewProfileButton');
    const overlay = document.getElementById('overlay');

    // Add event listeners for navigation buttons
    playPongButton.addEventListener('click', function () {
        navigateToSection('pong');
    });

    playRpsButton.addEventListener('click', function () {
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
