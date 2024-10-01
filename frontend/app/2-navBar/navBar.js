document.addEventListener('loggedIn', function () {
    updateNavbarBasedOnLogin();
});

// Utility function to open popups
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

// Utility function to close all popups
function closeAllPopups(removeBlur = true) {
    document.getElementById('loginPopup').style.display = 'none';
    document.getElementById('signupPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

    if (removeBlur) {
        toggleBlur(false);
    }
}

// Toggle blur effect for popups
function toggleBlur(shouldBlur) {
    const mainContent = document.getElementById('mainContent');
    if (shouldBlur) {
        mainContent.classList.add('blurred');
    } else {
        mainContent.classList.remove('blurred');
    }
}

// Update the navbar based on the login status
function updateNavbarBasedOnLogin() {
    const isLoggedIn = localStorage.getItem('username');
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const userGreeting = document.getElementById('userGreeting');
    const viewProfileButton = document.getElementById('viewProfileButton');
    const logoutButton = document.getElementById('logoutButton');

    if (isLoggedIn) {
        const username = localStorage.getItem('username');
        loginButton.style.display = 'none';
        signupButton.style.display = 'none';
        userGreeting.querySelector('span').textContent = `Welcome, ${username}!`;
        userGreeting.classList.remove('d-none');
        viewProfileButton.classList.remove('d-none');
        logoutButton.classList.remove('d-none');
    } else {
        loginButton.style.display = 'block';
        signupButton.style.display = 'block';
        userGreeting.classList.add('d-none');
        viewProfileButton.classList.add('d-none');
        logoutButton.classList.add('d-none');
    }
}

// Event listeners for buttons and links
const signupButton = document.getElementById('signupButton');
const loginButton = document.getElementById('loginButton');
const viewHomeButton = document.getElementById('viewHomeButton');
const viewAboutButton = document.getElementById('viewAboutButton');
const viewProfileButton = document.getElementById('viewProfileButton');
const viewPongMainButton = document.getElementById('viewPongMainButton');
const viewTicTacToeMainButton = document.getElementById('viewTicTacToeMainButton');
const gamesDropdownButton = document.getElementById('gamesDropdownButton');
const overlay = document.getElementById('overlay');

// Add event listeners for navigation buttons
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

// Routing handled through index.js functions
viewAboutButton.addEventListener('click', function (event) {
	console.log('navbar')
    changeRoute('/about');
});

viewPongMainButton.addEventListener('click', function () {
    changeRoute('/games/pong');
});

viewTicTacToeMainButton.addEventListener('click', function () {
    changeRoute('/games/tic-tac-toe');
});

viewProfileButton.addEventListener('click', function () {
    changeRoute('/profile');
});

gamesDropdownButton.addEventListener('click', function () {
    changeRoute('/games');
});

// DOMContentLoaded event listener for the initial setup
document.addEventListener('DOMContentLoaded', function () {
    // Initialize navbar based on login state
    updateNavbarBasedOnLogin();

    // Handle back/forward navigation and URL changes
    window.addEventListener('popstate', function (event) {
        const state = event.state || {};
        if (state.section) {
            changeRoute(`/${state.section}`);
        } else if (state.popup) {
            openPopup(state.popup, false); // Open the popup without pushing a new state
        } else {
            changeRoute('/home');
        }
    });

    // Initialize based on the current URL
    const initialPath = window.location.pathname;
    if (initialPath.includes('login') || initialPath.includes('signup')) {
        openPopup(initialPath.slice(1), false);
    } else {
        changeRoute(initialPath);
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
