//only interaction with the login pop up
document.getElementById('signupLink').addEventListener('click', function(event) {
	event.preventDefault(); // Prevent default anchor behavior

	// Use the globally available function to close the login popup and open the login popup
	closeAllPopups(false);
	openPopup('signup', true);
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
	event.preventDefault();
	console.log('submit buton');
	await login(event);
});


    async function login(event) {
        const username = document.getElementById('UsernameFieldLogin').value;
        const password = document.getElementById('PasswordField').value;
        const mfa = document.getElementById('MfaField').value;

        const submitButton = document.querySelector('#loginForm button[type="submit"]');
        submitButton.disabled = true;

        const isSuccess = await loginAdapter(username, password, mfa);

        if (isSuccess) {
            closeAllPopups(true); // Close all popups and remove blur effect
            const loggedInEvent = new CustomEvent('loggedIn');
            document.dispatchEvent(loggedInEvent);
        } else if (isSuccess === undefined){
            document.getElementById('2faGroup').style.display = 'block';
        } else {
            alert('Login failed. Please try again.');
        }
        if (event) {
            event.preventDefault();
        }
        submitButton.disabled = false;
    }
