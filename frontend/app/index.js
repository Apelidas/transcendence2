
// Function to handle routing
function handleRouting() {
    // Hide all sections by removing the active class
    document.querySelectorAll('.active').forEach(div => div.classList.remove('active'));

    const path = window.location.pathname;
	console.log('Routing to:', path); 


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
});

async function check_2fa() {
    const secret = window.otplib.authenticator.generateSecret(); // 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD';
    console.log("2FA secret = " + secret);
    const token = window.otplib.authenticator.generate(secret);
    console.log("2FA token = " + token);
    try {
        const isValid = window.otplib.authenticator.check(token, secret);
        console.log("2FA valid check!");
    } catch (err) {
        console.error(err);
    }
}

check_2fa();
