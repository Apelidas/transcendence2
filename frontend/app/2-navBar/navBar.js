document.addEventListener('loggedIn', function () {
    updateNavbarBasedOnLogin();
});

// Utility function to navigate between sections
function navigateToSection(section) {
    showSection(section);
    window.history.pushState({ section: section }, '', `/${section}`);
}

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

// Show the correct section based on the section ID
function showSection(section) {
    // Hide all sections
    document.querySelectorAll('#mainContent > .container > div').forEach(div => {
        div.style.display = 'none';
    });

    // Show the targeted section
    const sectionMap = {
        home: 'homepageSection',
        about: 'aboutSection',
        profile: 'profileSection',
        pong: 'pongGameSection',
        ticTacToe: 'ticTacToeGameSection',
        games: 'gamesSection'
    };

    const sectionId = sectionMap[section];
    if (sectionId) {
        document.getElementById(sectionId).style.display = 'block';
    }

    closeAllPopups(); // Close popups and remove blur when switching sections
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
    const profileButton = document.getElementById('profileButton');
    const logoutButton = document.getElementById('logoutButton');

    if (isLoggedIn) {
        const username = localStorage.getItem('username');
        loginButton.style.display = 'none';
        signupButton.style.display = 'none';
        userGreeting.querySelector('span').textContent = `Welcome, ${username}!`;
        userGreeting.classList.remove('d-none');
        profileButton.classList.remove('d-none');
        logoutButton.classList.remove('d-none');
    } else {
        loginButton.style.display = 'block';
        signupButton.style.display = 'block';
        userGreeting.classList.add('d-none');
        profileButton.classList.add('d-none');
        logoutButton.classList.add('d-none');
    }
}

// DOMContentLoaded event listener for the initial setup
document.addEventListener('DOMContentLoaded', function () {
    const signupButton = document.getElementById('signupButton');
    const loginButton = document.getElementById('loginButton');
    const viewAboutButton = document.querySelector('a[href="/about"]');
    const viewProfileButton = document.getElementById('viewProfileButton');
    const playPongButton = document.getElementById('playPongButton');
    const playTicTacToeButton = document.getElementById('playTicTacToeButton');
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

    viewAboutButton.addEventListener('click', function (event) {
        event.preventDefault();
        navigateToSection('about');
    });

    playPongButton.addEventListener('click', function () {
        navigateToSection('pong');
    });

    playTicTacToeButton.addEventListener('click', function () {
        navigateToSection('ticTacToe');
    });

    viewProfileButton.addEventListener('click', function () {
        navigateToSection('profile');
    });

    // Initialize navbar based on login state
    updateNavbarBasedOnLogin();

    // Handle back/forward navigation and URL changes
    window.addEventListener('popstate', function (event) {
        const state = event.state || {};
        if (state.section) {
            showSection(state.section);
        } else if (state.popup) {
            openPopup(state.popup, false); // Open the popup without pushing a new state
        } else {
            showSection('home');
        }
    });

    // Initialize based on the current URL
    const initialPath = window.location.pathname.slice(1);
    if (initialPath) {
        if (initialPath === 'login' || initialPath === 'signup') {
            openPopup(initialPath, false);
        } else {
            showSection(initialPath);
        }
    } else {
        showSection('home');
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
