document.addEventListener('DOMContentLoaded', async function () {

	// Handle login form submission
	const loginForm = document.getElementById('loginForm');
	loginForm.addEventListener('submit', function (event) {
		event.preventDefault(); // Prevent the form from submitting the traditional way
		login();
	});

	// Initially blur the main content
	toggleBlur(true);
	console.log('user-choice: ', document.getElementById('user-choice'));
});

async function loadContent(url, containerId, callback) {
	await fetch(url)
		.then(response => response.text())
		.then(data => {
			let container = document.getElementById(containerId);
			if (container !== null && container !== undefined) {
				container.innerHTML = data;
			}

			// If the URL is a JavaScript file, create a new script tag and append it to the body
			if (url.endsWith('.js')) {
				let script = document.createElement('script');
				script.src = url;
				document.body.appendChild(script);
			}

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
	//loadContent('siteComponents/header.html', 'header');
	//loadContent('siteComponents/body.html', 'body', function () {
	//    loadContent('siteComponents/bodyComponents/stoneGame/stoneGame.html', 'stoneGame');
	//    //loadContent('siteComponents/bodyComponents/stoneGame/stoneGame.js');
	//    loadContent('siteComponents/bodyComponents/stoneGame/stoneGame.css');

	//    loadContent('siteComponents/bodyComponents/pong/pong.html', 'pongGame');
	//    loadContent('siteComponents/bodyComponents/pong/pong.css');

	//});
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