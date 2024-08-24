//only interaction with the signup pop up

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginLink').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior

        // Hide signup popup
        document.getElementById('signupPopup').style.display = 'none';

        // Show login popup
        document.getElementById('loginPopUp').style.display = 'block';

        // Apply blur to the background if necessary
        toggleBlur(true);
    });

    document.getElementById('signupForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        await signup();
    });
});

//ES6 modules (no library or framework but a JS feature)
import { signupAdapter} from '../Services/signup.js'

async function signup() {
	const email = document.getElementById('EmailFieldSignup').value;
    const password = document.getElementById('PasswordFieldSignup').value;
    const repeatPassword = document.getElementById('RepeatPasswordFieldSignup').value;
    
    // Check if passwords match
    if (password !== repeatPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    const submitButton = document.querySelector('#signupForm button[type="submit"]');
    submitButton.disabled = true;
	console.log('before call')
	const isSuccess =  await signupAdapter(email, password)
	console.log('after call')
	if (isSuccess) {
		console.log('within evaluation')
		document.getElementById('signupPopup').style.display = 'none';
		toggleBlur();
		alert('Sign-up successful!');
	} else {
		const errorData = await response.json();
		console.log('within bad evaluation')
		alert(`Sign-up failed: ${errorData.message || 'An unknown error occurred.'}`);
	}
	submitButton.disabled = false;
}



