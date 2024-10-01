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


// Function to handle routing
function handleRouting() {
    const path = window.location.pathname;

    switch (path) {
        case '/':
        case '/home':
            showSection('homepageSection');
            break;
        case '/about':
            showSection('aboutSection');
            break;
		case '/games':
			showSection('gamesSection');
			break;
		case '/games/pong':
			showSection('pongMainSection'); // Display Pong main section
			break;
		case '/games/pong/pvp':
			showSection('pvpSection'); // Display Player vs Player section
			break;
		case '/games/pong/ai':
			showSection('aiSection'); // Display Player vs AI section
			break;
		case '/games/pong/tournament':
			showSection('tournamentSection'); // Display Tournament section
			break;

        case '/profile':
            showSection('profileSection');
            break;
        default:
            showSection('homepageSection'); // Default to homepage if no match
            break;
    }
}

// Update URL and content based on route
function changeRoute(path) {
    window.history.pushState({}, '', path); // Update the URL without reloading
    handleRouting(); // Call handleRouting to update the displayed content
}

// Listen for changes in the browser's back/forward history
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
