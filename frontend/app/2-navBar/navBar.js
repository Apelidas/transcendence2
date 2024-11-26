document.addEventListener('loggedIn', function () {
    updateNavbarBasedOnLogin();
});

function updateNavbarBasedOnLogout() {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const userGreeting = document.getElementById('userGreeting');
    const viewProfileButton = document.getElementById('viewProfileButton');
    const logoutButton = document.getElementById('logoutButton');

    console.log('updating navBar')
    const username = localStorage.getItem('username');
    console.log(username)
    loginButton.style.display = 'block';
    signupButton.style.display = 'block';
    userGreeting.querySelector('span').textContent = ``;
    userGreeting.classList.add('d-none');
    viewProfileButton.classList.add('d-none');
    logoutButton.classList.add('d-none');
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

document.addEventListener('loggedOut', function (){
    updateNavbarBasedOnLogout();
})

// Utility function to open popups
function openPopup(popup, pushState = true) {
    if (pushState) {
        window.history.pushState({popup: popup}, '', `/${popup}`);
    }
    closeAllPopups(false); // Close any open popups without removing blur

    if (popup === 'login') {
        document.getElementById('loginPopup').style.display = 'block';
    } else if (popup === 'signup') {
        document.getElementById('signupPopup').style.display = 'block';
    } else if (popup === 'mfa-enable') {
        document.getElementById('mfaPopup').style.display = 'block';
    }

    document.getElementById('overlay').style.display = 'block';
    toggleBlur(true);
}

// Utility function to close all popups
function closeAllPopups(removeBlur = true) {
    document.getElementById('loginPopup').style.display = 'none';
    document.getElementById('signupPopup').style.display = 'none';
    document.getElementById('mfaPopup').style.display = 'none';
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
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const userGreeting = document.getElementById('userGreeting');
    const viewProfileButton = document.getElementById('viewProfileButton');
    const logoutButton = document.getElementById('logoutButton');

    console.log('updating navBar')
    const username = localStorage.getItem('username');
    console.log(username)
    loginButton.style.display = 'none';
    signupButton.style.display = 'none';
    userGreeting.querySelector('span').textContent = `Welcome, ${username}!`;
    userGreeting.classList.remove('d-none');
    viewProfileButton.classList.remove('d-none');
    logoutButton.classList.remove('d-none');
}

// Event listeners for buttons and links
const signupButton = document.getElementById('signupButton');
const loginButton = document.getElementById('loginButton');
const overlay = document.getElementById('overlay');
const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', function () {
    updateNavbarBasedOnLogout();
})

// Add event listeners for navigation buttons
loginButton.addEventListener('click', function () {
    openPopup('login');
});

signupButton.addEventListener('click', function () {
    openPopup('signup');
});
// // Handle clicks outside popups to close them
overlay.addEventListener('click', function () {
    closeAllPopups(true);
});


// DOMContentLoaded event listener for the initial setup
document.addEventListener('DOMContentLoaded', function () {
    // Initialize navbar based on login state

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
