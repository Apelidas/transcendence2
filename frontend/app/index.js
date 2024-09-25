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

// Function to show the appropriate section based on ID
function showSection(sectionId) {
    const sections = document.querySelectorAll('#mainContent > .container > div');
    sections.forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });
    document.getElementById(sectionId).style.display = 'block'; // Show the selected section
}

// Function to handle routing and display sections based on URL
function handleRouting() {
    const path = window.location.pathname; // Get the current path from the URL

    if (path === '/' || path === '/home') {
        showSection('homepageSection');
    } else if (path === '/about') {
        showSection('aboutSection');
    } else if (path === '/profile') {
        showSection('profileSection'); // Ensure this section exists
    } else if (path.startsWith('/games')) {
        if (path.includes('pong')) {
            showSection('pongGameSection'); // Ensure this section exists
        } else if (path.includes('tic-tac-toe')) {
            showSection('tickTacToeSection'); // Ensure this section exists
        } else {
            showSection('gamesSection');
        }
    } else {
        alert('Page not found'); // Handle 404 error or redirect
    }
}

// Function to programmatically navigate and update the URL
function changeRoute(path) {
    window.history.pushState({}, '', path); // Update the URL without reloading
    handleRouting(); // Update content based on the new route
}

// Listen to popstate event (for back/forward navigation)
window.addEventListener('popstate', handleRouting);

// Initialize routing on page load
document.addEventListener('DOMContentLoaded', function () {
    // Handle clicks outside popups to close them
    const overlay = document.getElementById('overlay');
    overlay.addEventListener('click', function () {
        closeAllPopups(true);
    });

    // Initialize page content based on the current URL
    handleRouting();

    // Set up event listeners for navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default link behavior
            const targetPath = event.target.getAttribute('href');
            changeRoute(targetPath); // Use changeRoute to update the URL and content
        });
    });
});
