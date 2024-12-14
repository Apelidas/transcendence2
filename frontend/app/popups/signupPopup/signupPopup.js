//only interaction with the signup pop up

document.getElementById('loginLink').addEventListener('click', function(event) {
	event.preventDefault(); // Prevent default anchor behavior

	// Use the globally available function to close the signup popup and open the login popup
	closeAllPopups(false);
	openPopup('login', true);
});

document.getElementById('signupForm').addEventListener('submit', async function(event) {
	event.preventDefault();
	await signup();
});


async function signup() {
    const email = document.getElementById('EmailFieldSignup').value;
    const username = document.getElementById('UsernameFieldSignup').value;
    const password = document.getElementById('PasswordFieldSignup').value;
    const repeatPassword = document.getElementById('RepeatPasswordFieldSignup').value;

    if (password !== repeatPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    const submitButton = document.querySelector('#signupForm button[type="submit"]');
    submitButton.disabled = true;
    
    const response = await signupAdapter(email, username, password);

    if (response.status === 200) {
        closeAllPopups(true); // Close all popups and remove blur effect
        alert('Sign-up successful!');
    } else if(response.status === 409){
        response.json().then( error => {
            alert(error.error);
        })
    } else {
        alert('Sign-up failed. Please try again.');
    }

    submitButton.disabled = false;
}
