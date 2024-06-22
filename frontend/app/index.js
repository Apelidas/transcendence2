document.addEventListener('DOMContentLoaded', async function () {
		
	// Initially blur the main content
	toggleBlur(true);
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