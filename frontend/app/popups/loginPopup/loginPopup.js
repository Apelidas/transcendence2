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
        const errorMessage = document.getElementById('ErrorMessage'); // Assuming you have an element to display errors
    

        const submitButton = document.querySelector('#loginForm button[type="submit"]');
        submitButton.disabled = true;

        // Clear any previous error messages
        errorMessage.style.display = "none";
        errorMessage.textContent = "";

        // Attempt login
        const isSuccess = await loginAdapter(username, password, mfa);
        
        if (isSuccess) {
            closeAllPopups(true); // Close all popups and remove blur effect
            const loggedInEvent = new CustomEvent('loggedIn');
            document.dispatchEvent(loggedInEvent);
            document.getElementById('UsernameFieldLogin').value = '';
            document.getElementById('PasswordField').value = '';
            document.getElementById('MfaField').value = '';
        } else if (isSuccess === null){
            mfa.required = true;
            document.getElementById('2faGroup').style.display = 'block';
            errorMessage.textContent = "MFA field is required.";
            errorMessage.style.display = "block";
        } else {
            alert('Login failed. Please try again.');
        }
        if (event) {
            event.preventDefault();
        }
        submitButton.disabled = false;
    }
