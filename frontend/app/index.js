// Function to handle routing
function handleRouting() {
    // Hide all sections by removing the active class
    document.querySelectorAll('.active').forEach(div => div.classList.remove('active'));

    const path = window.location.pathname;


    switch (path) {
        case '/':
            console.log(document.getElementById('viewHome'))
            document.getElementById('viewHome').classList.add('active');
            break;
        case '/home':
            console.log(document.getElementById('viewHome'))
            console.log(document.getElementById('viewAbout'))
            document.getElementById('viewHome').classList.add('active');
            break;
        case '/about':
            console.log(document.getElementById('viewAbout'))
            document.getElementById('viewAbout').classList.add('active');
            break;
        case '/games':
            document.getElementById('gamesDropdown').classList.add('active');
            break;
        case '/games/pong':
            document.getElementById('viewPongMain').classList.add('active');
            break;
        case '/games/pong/pongPvP':
            document.getElementById('viewPongPvP').classList.add('active');
            break;
        case '/games/pong/pongAI':
            document.getElementById('viewPongAI').classList.add('active');
            break;
        case '/games/pong/pongTourn':
            document.getElementById('viewPongTourn').classList.add('active');
            break;
        case '/games/tic-tac-toe':
            console.log(document.getElementById('viewTicTacToeMain'));
            document.getElementById('viewTicTacToeMain').classList.add('active');
            break;
        case '/games/ticTacToe/ticTacToePvP':
            document.getElementById('viewTicTacToePvP').classList.add('active');
            break;
        case '/games/ticTacToe/ticTacToeAI':
            document.getElementById('viewTicTacToeAI').classList.add('active');
            break;
        case '/games/ticTacToe/ticTacToeTourn':
            document.getElementById('viewTicTacToeTourn').classList.add('active');
            break;
        case '/profile':
            document.getElementById('viewProfile').classList.add('active');
            console.log('before request');
            getProfileData().then(value => setProfileData(value))
            break;
        default:
            document.getElementById('viewHome').classList.add('active');
            break;
    }
}

// Update URL and content based on route
function changeRoute(path) {
    window.history.pushState({}, '', path); // Update the URL without reloading
    console.log('changeRoute')
    handleRouting(); // Call handleRouting to update the displayed content
}

// Listen for changes in the browser's back/forward history
window.addEventListener('popstate', handleRouting);

// Initialize routing on page load
document.addEventListener('DOMContentLoaded', function () {
    // Initialize page content based on the current URL
    console.log('onLoad')
    handleRouting();
    checkIfLoggedIn();
});

function checkIfLoggedIn() {
    const token = getCookie('refresh_token');
    console.log('refreshToken before: ' + token);
    if (token !== undefined) {
        refreshToken().then((ifSuccess) => {
            console.log('Token refresh was: ' + ifSuccess + '-----')
            if (ifSuccess) {
                const loggedInEvent = new CustomEvent('loggedIn');
                document.dispatchEvent(loggedInEvent);
            }
            else{
                localStorage.setItem('refresh_token', null);
                localStorage.setItem('access_token', null);
            }
        })
    }
    console.log('refreshToken after: ' + localStorage.getItem('refresh_token'));
}
