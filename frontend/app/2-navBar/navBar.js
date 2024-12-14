document.addEventListener('loggedIn', function () {
    updateNavbarBasedOnLogin();
});

document.addEventListener('loggedOut', function () {
    changeRoute('/');
    updateNavbarBasedOnLogout();
});

function logout(){
    document.dispatchEvent(new Event('loggedOut'));
}

function updateNavbarBasedOnLogout() {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const userGreeting = document.getElementById('userGreeting');
    const viewProfileButton = document.getElementById('viewProfileButton');
    const logoutButton = document.getElementById('logoutButton');
    const viewHistoryButton = document.getElementById('viewHistoryButton');
    
    viewHistoryButton.classList.add('d-none');
    loginButton.style.display = 'block';
    signupButton.style.display = 'block';
    userGreeting.querySelector('span').textContent = ``;
    userGreeting.classList.add('d-none');
    viewProfileButton.classList.add('d-none');
    logoutButton.classList.add('d-none');
    setCookie('access_token', '', -10);
    setCookie('refresh_token', '', -10);
}

// Utility function to open popups
function openPopup(popup, pushState = true) {
    closeAllPopups(false); // Close any open popups without removing blur

    if (popup === 'login') {
        document.getElementById('loginPopup').style.display = 'block';
    } else if (popup === 'signup') {
        document.getElementById('signupPopup').style.display = 'block';
    } else if (popup === 'mfa-enable') {
        document.getElementById('mfaPopup').style.display = 'block';
    } else if(popup === 'pictureUploadPopup'){
        document.getElementById('pictureUploadPopup').style.display = 'block';
    } else if(popup === 'changePassword'){
        document.getElementById('changePasswordPopup').style.display = 'block';
    } else if(popup === 'changeEmail'){
        document.getElementById('changeEmailPopup').style.display = 'block';
    } else if(popup === 'addFriend'){
        document.getElementById('addFriendPopup').style.display = 'block';
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
    document.getElementById('pictureUploadPopup').style.display = 'none';
    document.getElementById('changePasswordPopup').style.display = 'none';
    document.getElementById('changeEmailPopup').style.display = 'none';
    document.getElementById('addFriendPopup').style.display = 'none';

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
    const viewHistoryButton = document.getElementById('viewHistoryButton');
    
    viewHistoryButton.classList.remove('d-none');
    const username = getCookie('username');
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

// Links within popups to switch between them
document.getElementById('signupLink').addEventListener('click', function (event) {
    event.preventDefault();
    openPopup('signup');
});

document.getElementById('loginLink').addEventListener('click', function (event) {
    event.preventDefault();
    openPopup('login');
});

// Handle back/forward navigation and URL changes
window.addEventListener('popstate', function (event) {
	const state = event.state || {};
	if (state.section) {
		changeRoute(`/${state.section}`);
	} else if (state.popup) {
		openPopup(state.popup, false); // Open the popup without pushing a new state
	} else {
		// changeRoute('/home');
	}
});
