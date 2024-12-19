// Function to handle routing
function handleRouting() {
    // Hide all sections by removing the active class
    document.querySelectorAll('.active').forEach(div => div.classList.remove('active'));

    let path = window.location.pathname;
    if (path !== '/' && path.endsWith('/')){
        path = path.slice(0, -1);
    }

    if (gameRunning) {
        endGame();
    }

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
        case '/games/history':
            checkIfLoggedIn().then(isLoggedIn => {
                if (!isLoggedIn){
                    changeRoute('/');
                    return;
                }
                document.getElementById('viewHistory').classList.add('active');
                setUpHistory();
            })
            break;
        case '/games/pong/pongPvP':
            document.getElementById('viewPongPvP').classList.add('active');
            const pvpField = document.getElementById('leftPlayerName');
            prefillPlayerName(pvpField);
            // window.history.pushState({}, '', path);
            break;
        case '/games/pong/pongAI':
            document.getElementById('viewPongAI').classList.add('active');
            const aiField = document.getElementById('aiLeftPlayerName');
            prefillPlayerName(aiField);
            // window.history.pushState({}, '', path);
            break;
        case '/games/pong/pongTourn':
            document.getElementById('viewPongTourn').classList.add('active');
            // window.history.pushState({}, '', path);
            break;
        case '/games/pong/pongCanvas':
            document.getElementById('viewPongCanvas').classList.add('active');
            break;
        case '/games/pong/pongBracket':
            document.getElementById('viewPongBracket').classList.add('active');
            break;
        case '/games/ticTacToe':
            document.getElementById('viewTicTacToeMain').classList.add('active');
            // window.history.pushState({}, '', path);
            break;
        case '/games/ticTacToe/ticTacToePvP':
            document.getElementById('viewTicTacToePvP').classList.add('active');
            const tttpvpField = document.getElementById('tttPlayer1Name');
            prefillPlayerName(tttpvpField);
            // window.history.pushState({}, '', path);
            break;
        case '/games/ticTacToe/ticTacToeAI':
            document.getElementById('viewTicTacToeAI').classList.add('active');
            const inputField = document.getElementById('aiPlayerName');
            prefillPlayerName(inputField);
            // window.history.pushState({}, '', path);
            break;
        case '/games/ticTacToe/ticTacToeTourn':
            document.getElementById('viewTicTacToeTourn').classList.add('active');
            // window.history.pushState({}, '', path);
            break;
        case '/games/ticTacToe/ticTacToeBracket':
            document.getElementById('viewTicTacToeBracket').classList.add('active');
            // window.history.pushState({}, '', path);
            break;
        case '/profile':
            checkIfLoggedIn().then(isLoggedIn => {
                if (!isLoggedIn){
                    changeRoute('/');
                    return;
                }
                document.getElementById('viewProfile').classList.add('active');
                console.log('switch to profile');
                getProfileData().then(value => {
                    setProfileData(value)
                })
                setupFriendslist();
                getGraphData().then(value => {
                    renderGeneralChart(value);
                    renderPongChart(value);
                    renderTicTacToeChart(value);
                })
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
    handleRouting(); // Call handleRouting to update the displayed content
}

// Listen for changes in the browser's back/forward history


// Initialize routing on page load
document.addEventListener('DOMContentLoaded', function () {
    // Initialize page content based on the current URL
    handleRouting();
    checkIfLoggedIn();
    window.addEventListener('popstate', handleRouting);
});

async function checkIfLoggedIn() {
    const token = getCookie('refresh_token');
    if (token !== undefined) {
        return refreshToken().then((ifSuccess) => {
            console.log('Token refresh was: ' + ifSuccess + '-----')
            if (ifSuccess) {
                const loggedInEvent = new CustomEvent('loggedIn');
                document.dispatchEvent(loggedInEvent);
                return true;
            } else {
                const loggedOutEvent = new CustomEvent('loggedOut');
                document.dispatchEvent(loggedOutEvent);
                return false;
            }
        })
    }
    return Promise.resolve(false);

}
