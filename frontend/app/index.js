// Function to handle routing
function handleRouting() {
    // Hide all sections by removing the active class
    document.querySelectorAll('.active').forEach(div => div.classList.remove('active'));

    const path = window.location.pathname;

    console.log('switch to path: ' + path);
    switch (path) {
        case '/':
            document.getElementById('viewHome').classList.add('active');
            // window.history.pushState({}, '', path);
            break;
        case '/home':
            document.getElementById('viewHome').classList.add('active');
            // window.history.pushState({}, '', path);
            break;
        case '/about':
            document.getElementById('viewAbout').classList.add('active');
            // window.history.pushState({}, '', path);
            break;
        case '/games':
            document.getElementById('gamesDropdown').classList.add('active');
            // window.history.pushState({}, '', path);
            break;
        case '/games/pong':
            document.getElementById('viewPongMain').classList.add('active');
            // window.history.pushState({}, '', path);
            break;
        case '/games/pong/pongPvP':
            document.getElementById('viewPongPvP').classList.add('active');
            // window.history.pushState({}, '', path);
            break;
        case '/games/pong/pongAI':
            document.getElementById('viewPongAI').classList.add('active');
            // window.history.pushState({}, '', path);
            break;
        case '/games/pong/pongTourn':
            document.getElementById('viewPongTourn').classList.add('active');
            // window.history.pushState({}, '', path);
            break;
        case '/games/ticTacToe':
            document.getElementById('viewTicTacToeMain').classList.add('active');
            // window.history.pushState({}, '', path);
            break;
        case '/games/ticTacToe/ticTacToePvP':
            document.getElementById('viewTicTacToePvP').classList.add('active');
            // window.history.pushState({}, '', path);
            break;
        case '/games/ticTacToe/ticTacToeAI':
            document.getElementById('viewTicTacToeAI').classList.add('active');
            // window.history.pushState({}, '', path);
            break;
        case '/games/ticTacToe/ticTacToeTourn':
            document.getElementById('viewTicTacToeTourn').classList.add('active');
            // window.history.pushState({}, '', path);
            break;
        case '/profile':
            document.getElementById('viewProfile').classList.add('active');
            // window.history.pushState({}, '', path);
            getProfileData().then(value => {
                if (value === undefined) {
                    handleRouting();
                } else {
                    setProfileData(value)
                }
            })
            break;
        default:
            document.getElementById('viewHome').classList.add('active');
            // window.history.pushState({}, '', '/');
            break;
    }
}

// Update URL and content based on route
function changeRoute(path) {
    window.history.pushState({}, '', path); // Update the URL without reloading
    console.log('changeRoute: ' + path);
    handleRouting(); // Call handleRouting to update the displayed content
}

// Listen for changes in the browser's back/forward history


// Initialize routing on page load
document.addEventListener('DOMContentLoaded', function () {
    // Initialize page content based on the current URL
    console.log('onLoad')
    handleRouting();
    checkIfLoggedIn();
    window.addEventListener('popstate', handleRouting);
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
            } else {
                localStorage.setItem('refresh_token', null);
                localStorage.setItem('access_token', null);
            }
        })
    }
    console.log('refreshToken after: ' + localStorage.getItem('refresh_token'));
}
