// Function to navigate to different game modes (Player vs Player, Player vs AI, Tournament)
function changeRoute(path) {
    window.history.pushState({}, '', path); // Update the URL without reloading the page
    handleRouting(); // Call routing function to update the content dynamically
}

/*
// Routing logic to display the appropriate content when a mode is selected
function handleRouting() {
    const path = window.location.pathname;

    switch (path) {
        case '/games/pong/pvp':
            showSection('pvpSection');
            break;
        case '/games/pong/ai':
            showSection('aiSection');
            break;
        case '/games/pong/tournament':
            showSection('tournamentSection');
            break;
        default:
            showSection('pongMainSection');
            break;
    }
}
*/

// Initialize routing on page load
document.addEventListener('DOMContentLoaded', handleRouting);

// Listen for back/forward navigation
window.addEventListener('popstate', handleRouting);
