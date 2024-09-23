// Utility functions available globally
function toggleBlur(shouldBlur) {
    const mainContent = document.getElementById('mainContent');
    if (shouldBlur) {
        mainContent.classList.add('blurred');
    } else {
        mainContent.classList.remove('blurred');
    }
}

function closeAllPopups(removeBlur = true) {
    document.getElementById('loginPopup').style.display = 'none';
    document.getElementById('signupPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

    if (removeBlur) {
        toggleBlur(false);
    }
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('#mainContent > .container > div');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function handleNavigation(path) {
    if (path.includes('about')) {
        showSection('aboutSection');
    } else if (path.includes('profile')) {
        showSection('profileSection');
    } else if (path.includes('games')) {
        if (path.includes('pong')) {
            showSection('pongGameSection');
        } else if (path.includes('tickTacToe')) {
            showSection('tickTacToeSection');
        } else {
            showSection('gamesSection');
        }
    } else {
        showSection('homepageSection');
    }
    window.history.pushState({}, '', path);
}

// DOMContentLoaded event listener for the initial setup
document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('overlay');

    // Handle clicks outside popups to close them
    overlay.addEventListener('click', function () {
        closeAllPopups(true);
    });

    // Initialize page content based on the current URL
    //let initialPath = window.location.pathname.slice(1);
    //if (!initialPath) initialPath = 'home';

    handleNavigation(initialPath);

    // Set up event listeners for navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetPath = event.target.getAttribute('href');
            handleNavigation(targetPath);
        });
    });
});
