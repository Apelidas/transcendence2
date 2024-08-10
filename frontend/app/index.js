document.addEventListener('DOMContentLoaded', async function () {
		
	// Initially blur the main content
	toggleBlur(true);
});

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