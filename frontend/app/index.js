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

// DOMContentLoaded event listener for the initial setup
document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('overlay');

    // Handle clicks outside popups to close them
    overlay.addEventListener('click', function () {
        closeAllPopups(true);
    });

    // Initialize page content based on the current URL
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
});
