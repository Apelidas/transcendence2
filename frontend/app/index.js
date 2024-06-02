document.addEventListener('DOMContentLoaded', function () {
    // Load header content
    loadContent('siteComponents/header/header.html', 'header');

    // Load body content and then load Stone Game content
    loadContent('siteComponents/body.html', 'body', function () {
        loadContent('siteComponents/bodyComponents/stoneGame.html', 'stoneGame');
    });

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        login();
    });

    // Initially blur the main content
    toggleBlur(true);
});

function loadContent(url, containerId, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
            if (callback) {
                callback(); // Call the callback function if provided
            }
        })
        .catch(error => console.error('Error loading content:', error));
}

function login() {
    // Simulate login logic here
    console.log('User logged in');

    // Hide the login popup
    document.getElementById('loginPopup').style.display = 'none';

    // Remove the blur effect from the main content
    toggleBlur(false);

    // Load header and body content again if necessary
	loadContent('siteComponents/header.html', 'header');
    loadContent('siteComponents/body.html', 'body', function () {
        loadContent('siteComponents/bodyComponents/stoneGame.html', 'stoneGame');
    });
}

function redirectToLoginPage() {
    document.getElementById('loginPopup').style.display = 'block';
    toggleBlur(true);
}

function redirectToPopUp() {
    document.getElementById('loginPopup').style.display = 'block';
    toggleBlur(true);
}

function toggleBlur(shouldBlur) {
    const mainContent = document.getElementById('mainContent');
    if (shouldBlur) {
        mainContent.classList.add('blurred');
    } else {
        mainContent.classList.remove('blurred');
    }
}